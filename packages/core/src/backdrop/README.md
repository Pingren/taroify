# Backdrop 背景板

### 介绍

创建一个背景幕，用于强调特定的页面元素，并阻止用户进行其他操作。

### 引入

```jsx
import { Backdrop } from "@taroify/core"
```

## 代码演示

### 基础用法

```jsx
import { Backdrop, Button } from "@taroify/core"

function BackdropExample() {
  const [open, setOpen] = useState(false)
  return <>
    <Button onClick={() => setOpen(true)}>显示背景板</Button>
    <Backdrop
      open={open} closeable
      onClose={() => setOpen(false)}
    />
  </>
}
```

### 嵌入内容

通过 children 可以在背景板上嵌入任意内容。

```jsx
import { Backdrop, Button } from "@taroify/core"

function BackdropExample() {
  const [open, setOpen] = useState(false)
  return <>
    <Button onClick={() => setOpen(true)}>嵌入内容</Button>
    <Backdrop
      open={open} closeable
      onClose={() => setOpen(false)}
    >
      <View className="content-wrapper">
        <View className="content-block" />
      </View>
    </Backdrop>
  </>
}

```

```css
.content-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.content-block {
  width: 120px;
  height: 120px;
  background-color: #fff;
}
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| className | 自定义类名 | _string_ | - |
| children | 用于在遮罩层上方嵌入内容| _ReactNode_ | - |
| open | 是否展示遮罩层 | _boolean_ | `false` |
| duration | 动画时长，单位秒 | _number \| string_ | `0.3` |

### Events

| 事件名 | 说明       | 回调参数            |
| ------ | ---------- | ------------------- |
| click  | 点击时触发 | _event: MouseEvent_ |
