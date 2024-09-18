import * as React from "react";
import {MutableRefObject, useRef} from "react";
import {useOnClickOutside} from "usehooks-ts";

interface Props {
  closeForm: () => void;
  remove: (guid: string) => void
  guid: string
}

const Settings: React.FC<Props> = (Props) => {
  const refRemove: MutableRefObject<any> = useRef(null)

  /* Закрыть форму при нажатии вне её */
  useOnClickOutside(refRemove, Props.closeForm)

  return (
    <div className="settings" ref={refRemove} onClick={() => Props.remove(Props.guid)}>
      Удалить
    </div>
  )
}

export default Settings
