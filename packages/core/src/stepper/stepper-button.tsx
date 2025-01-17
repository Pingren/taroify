import { ITouchEvent, View } from "@tarojs/components"
import classNames from "classnames"
import * as React from "react"
import { useCallback, useContext, useRef } from "react"
import { prefixClassname } from "../styles"
import { preventDefault } from "../utils/dom/event"
import { getSizeStyle } from "../utils/format/unit"
import StepperContext from "./stepper.context"
import { StepperActionType, StepperActionTypeString } from "./stepper.shared"

const LONG_PRESS_INTERVAL = 200

const LONG_PRESS_START_TIME = 600

interface StepperButtonProps {
  className?: string
  disabled?: boolean

  onClick?(event: ITouchEvent): void
}

interface InternalStepperButtonProps extends StepperButtonProps {
  type?: StepperActionType | StepperActionTypeString
}

function StepperButton(props: StepperButtonProps) {
  const {
    className,
    type = StepperActionType.Decrease,
    disabled: disabledProp,
  } = props as InternalStepperButtonProps

  const {
    value = 0,
    min = 0,
    max = 0,
    size,
    disabled: disabledCtx,
    longPress,
    onStep,
  } = useContext(StepperContext)

  const disabled =
    disabledProp ||
    disabledCtx ||
    (type === StepperActionType.Decrease && value <= min) ||
    (type === StepperActionType.Increase && value >= max)

  const longPressRef = useRef(false)

  let longPressTimerRef = useRef<NodeJS.Timeout>()

  const longPressStep = useCallback(() => {
    longPressTimerRef.current = setTimeout(() => {
      onStep?.(type)
      longPressStep()
    }, LONG_PRESS_INTERVAL)
  }, [onStep, type])

  const onTouchStart = useCallback(() => {
    if (longPress) {
      longPressRef.current = false
      if (longPressTimerRef.current) {
        clearTimeout(longPressTimerRef.current)
      }
      longPressTimerRef.current = setTimeout(() => {
        longPressRef.current = true
        onStep?.(type)
        longPressStep()
      }, LONG_PRESS_START_TIME)
    }
  }, [longPress, longPressStep, onStep, type])

  const onTouchEnd = useCallback(
    (event: ITouchEvent) => {
      if (longPress) {
        if (longPressTimerRef.current) {
          clearTimeout(longPressTimerRef.current)
        }
        if (longPressRef.current) {
          preventDefault(event)
        }
      }
    },
    [longPress],
  )

  return (
    <View
      className={classNames(
        prefixClassname(`stepper__${type}`),
        {
          [prefixClassname(`stepper__${type}--disabled`)]: disabled,
        },
        className,
      )}
      style={getSizeStyle(size)}
      onClick={(event) => {
        preventDefault(event)
        onStep?.(type)
      }}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onTouchCancel={onTouchEnd}
    />
  )
}

export default StepperButton
