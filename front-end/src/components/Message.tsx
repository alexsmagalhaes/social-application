import { ReactElement } from "react"

interface MessageProps {
   message: string,
   type: "error" | "success"
}

export default function Message({ message, type }: MessageProps): ReactElement {
   return (
      <div data-type={type}>
         {message}
      </div>
   )
}