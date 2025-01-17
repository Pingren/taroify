import { Cell, Transition } from "@taroify/core"
import { TransitionName } from "@taroify/core/transition"
import ArrowRight from "@taroify/icons/ArrowRight"
import { View } from "@tarojs/components"
import classNames from "classnames"
import * as React from "react"
import { useState } from "react"
import Block from "../../../components/block"
import Page from "../../../components/page"
import "./index.scss"

export default function TransitionDemo() {
  const [name, setName] = useState<TransitionName>(TransitionName.Fade)
  const [state, setState] = useState(false)

  function toggleTransition(newName: TransitionName) {
    setName(newName)
    setState(!state)
  }

  return (
    <Page title="内置样式" className="style-demo">
      <Block title="文字省略">
        <View className={classNames("taroify-ellipsis", "ellipsis-text")}>
          这是一段最多显示一行的文字，后面的内容会省略省略省略
        </View>
        <View className={classNames("taroify-ellipsis--l2", "ellipsis-text")}>
          这是一段最多显示两行的文字，后面的内容会省略。这是一段最多显示两行的文字，后面的内容会省略。这是一段最多显示两行的文字，后面的内容会省略。
        </View>
      </Block>
      <Block title="1px 边框">
        <View className={classNames("taroify-hairline--top", "hairline-line")} />
      </Block>
      <Block title="动画">
        <Cell
          clickable
          title="Fade"
          rightIcon={<ArrowRight />}
          onClick={() => toggleTransition(TransitionName.Fade)}
        />
        <Cell
          clickable
          title="Slide Up"
          rightIcon={<ArrowRight />}
          onClick={() => toggleTransition(TransitionName.SlideUp)}
        />
        <Cell
          clickable
          title="Slide Down"
          rightIcon={<ArrowRight />}
          onClick={() => toggleTransition(TransitionName.SlideDown)}
        />
        <Cell
          clickable
          title="Slide Left"
          rightIcon={<ArrowRight />}
          onClick={() => toggleTransition(TransitionName.SlideLeft)}
        />
        <Cell
          clickable
          title="Slide Right"
          rightIcon={<ArrowRight />}
          onClick={() => toggleTransition(TransitionName.SlideRight)}
        />
        <Transition
          in={state}
          duration={{ enter: 500, exit: 300 }}
          name={name}
          onEntered={() => setState(false)}
        >
          <View className="animate-block" />
        </Transition>
      </Block>
    </Page>
  )
}
