interface Props {
  value: string
  defaultValue: string
  setter: (value: string) => void
  duration: number
  ending?: () => void
}

const useAnimation = () => {
  const animate = ({value, defaultValue, setter, duration, ending}: Props) => {
    setter(value)
    setTimeout(() => {
      setter(defaultValue)
      ending && ending()
    }, duration)
  }
  return animate
}

export default useAnimation