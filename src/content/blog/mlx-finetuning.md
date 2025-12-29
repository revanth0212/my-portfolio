---
id: "mlx-finetuning"
title: "A Guide to Fine-Tuning Gemma 3 on Apple Hardware"
date: "2025-12-29"
readTime: "10 min read"
excerpt: "In the current landscape of AI, bigger isn't always better. While massive models know a little bit about everything developers only need a partner that deeply understands their specific language."
tags: ["AI", "Fine-tuning", "MLX"]
---

In the current landscape of AI, bigger isn't always better. While massive models know a little bit about everything—from French poetry to Python—most developers only need a partner that deeply understands their specific language.

This guide shows you how to take **Gemma 3 (4B)** and turn it into a dedicated JavaScript specialist. We aren't building a world-class expert here; instead, we are showing you a **proof-of-concept** for how to customize an AI on a standard Mac using Apple’s own hardware-accelerated tools.

---

## 1. Organizing the Data: Teaching JavaScript Patterns

AI models learn by seeing examples. To make a model better at JavaScript, we need to feed it a clean diet of "Instruction and Response" pairs. We want to filter out the "noise" of other programming languages so the model’s focus stays purely on JS.

### The Preparation Script

We use a simple Node.js script to take raw datasets and format them into the specific "language" Gemma 3 understands. This script ensures every example includes the correct tags so the AI knows when you are talking and when it should respond.

```javascript
const fs = require('fs');
const path = require('path');

// This function wraps our code in tags the AI recognizes
const formatGemma = (question, answer) => ({
    text: `<start_of_turn>user\n${question}<end_of_turn>\n<start_of_turn>model\n${answer}<end_of_turn>`
});

async function prepareDataset() {
    const DATA_DIR = './data';
    if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR);

    const rawData = JSON.parse(fs.readFileSync('dataset.json', 'utf8'));
    
    // Filter for high-quality JavaScript signals (like arrow functions)
    const jsData = rawData.filter(item => 
        item.output.includes('=>') || 
        item.output.includes('const ') || 
        item.instruction.toLowerCase().includes('javascript')
    );

    // Shuffle the data and split it (90% for training, 10% for testing)
    jsData.sort(() => 0.5 - Math.random());
    const splitIdx = Math.floor(jsData.length * 0.9);

    const writeJsonl = (name, data) => {
        const stream = fs.createWriteStream(path.join(DATA_DIR, name));
        data.forEach(d => stream.write(JSON.stringify(formatGemma(d.instruction, d.output)) + '\n'));
        stream.end();
    };

    writeJsonl('train.jsonl', jsData.slice(0, splitIdx));
    writeJsonl('valid.jsonl', jsData.slice(splitIdx));
}
prepareDataset();

```

---

## 2. The Training Process: MLX on the Mac

To do the actual "teaching," we use a tool called **MLX-LM**. This was built by Apple’s researchers to make sure AI training runs as fast as possible on M1, M2, or M3/M4 chips.

Because training can be memory-heavy, we use a few clever settings to make sure it doesn't crash a standard laptop:

* **Batch Size 1:** We look at one example at a time.
* **Grad Checkpointing:** A memory-saving trick that calculates logic only when needed.

### The Fine-Tuning Command

Run this in your terminal. It tells the computer to take the base Gemma model and start learning from your new data.

```bash
python -m mlx_lm.lora \
  --model google/gemma-3-4b-it \
  --train \
  --data ./data \
  --batch-size 1 \
  --num-layers 8 \
  --iters 1000 \
  --grad-checkpoint \
  --adapter-path ./js_specialist_adapters

```

---

## 3. Fusing the New Knowledge

After training, your model has a "backpack" of new knowledge (the adapters). To make it easy to use in other apps, we "fuse" that backpack into the main model to create one single, standalone folder.

```bash
python -m mlx_lm.fuse \
  --model google/gemma-3-4b-it \
  --adapter-path ./js_specialist_adapters \
  --save-path ./gemma-3-js-expert

```

---

## 4. Running Your Model in LM Studio

Now that you have your own version of Gemma, you can use it in a friendly chat interface like **LM Studio**.

1. **Find the hidden folder:** Open your terminal and type `open ~/.lmstudio/models`.
2. **Move your model:** Create a folder inside called `my-models`, and drop your `gemma-3-js-expert` folder in there.
3. **Start Chatting:** Open LM Studio. Your new JS Specialist will appear in your local library, ready to answer questions.

---

## Summary: A Glimpse into Custom AI

This project demonstrates how accessible AI customization has become. By focusing a small model on a single task, you get several benefits:

* **Total Privacy:** Your code and your data never leave your computer.
* **Efficiency:** A specialized 4B model is often faster and more helpful for specific tasks than a massive, unspecialized one.
* **No Cloud Costs:** You are using the hardware you already own.

**Keep in mind:** This is just a sample. To create a "Production Expert" that knows every library and edge case, you would need a much larger dataset (50,000+ examples) and significant compute time on high-end hardware.

**Would you like me to help you set up a testing script to compare your new model's JavaScript answers against the original version?**