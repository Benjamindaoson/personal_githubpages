---
title: JavaScript 实验：最小提示词构造
---

# JavaScript 实验：最小提示词构造

```js
function buildPrompt(topic) {
  return `用三句话解释 ${topic}，并给出一个工程例子。`;
}

console.log(buildPrompt("结构化输出"));
```

预期输出应包含明确任务、长度约束和主题。
