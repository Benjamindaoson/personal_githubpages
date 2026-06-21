---
title: Python 实验：最小模型调用
---

# Python 实验：最小模型调用

```python
def build_prompt(topic: str) -> str:
    return f"用三句话解释 {topic}，并给出一个工程例子。"

print(build_prompt("上下文窗口"))
```

预期输出应包含明确任务、长度约束和主题。
