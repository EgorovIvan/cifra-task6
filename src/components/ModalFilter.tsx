import Input from "./Input.tsx";
import Button from "./Button.tsx";
import {useEffect} from "react";
import {useImmer} from "use-immer";
import * as React from "react";

interface Props {
  handleCloseModalFilter: () => void;
  handleCloseModals: () => void;
}

interface State {
  value: string;
  errorField: boolean;
  isNull: boolean;
  newClass: string;
}

const ModalVznList: React.FC<Props> = ({handleCloseModalFilter, handleCloseModals}: Props) => {

  const [inputVznNumber, updateInputVznNumber] = useImmer<State>({
    value: "",
    errorField: false,
    isNull: false,
    newClass: 'field'
  });

  const [inputSender, updateInputSender] = useImmer<State>({
    value: "",
    errorField: false,
    isNull: false,
    newClass: 'field'
  });

  const [inputRecipient, updateInputRecipient] = useImmer<State>({
    value: "",
    errorField: false,
    isNull: false,
    newClass: 'field'
  });

  const [inputPeriod, updateInputPeriod] = useImmer<State>({
    value: "",
    errorField: false,
    isNull: false,
    newClass: ''
  });

  /* Отправка формы */
  const handleSearch = (): void => {
    if(!inputVznNumber.value) {
      updateInputVznNumber((draft) => {
        draft.isNull = true
        draft.newClass = draft.newClass.concat(" error-border")
      })
    } else {
      updateInputVznNumber((draft) => {
        draft.isNull = false
        draft.newClass = draft.newClass.replace(/error-border/g, '')
      })
    }

    if(!inputSender.value) {
      updateInputSender((draft) => {
        draft.isNull = true
        draft.newClass = draft.newClass.concat(" error-border")
      })

    } else {
      updateInputSender((draft) => {
        draft.isNull = false
        draft.newClass = draft.newClass.replace(/error-border/g, '')
      })
    }

    if(!inputRecipient.value) {
      updateInputRecipient((draft) => {
        draft.isNull = true
        draft.newClass = draft.newClass.concat(" error-border")
      })

    } else {
      updateInputRecipient((draft) => {
        draft.isNull = false
        draft.newClass = draft.newClass.replace(/error-border/g, '')
      })
    }

    if(!inputPeriod.value) {
      updateInputPeriod((draft) => {
        draft.isNull = true
        draft.newClass = draft.newClass.concat(" error-border")
      })

    } else {
      updateInputPeriod((draft) => {
        draft.isNull = false
        draft.newClass = draft.newClass.replace(/error-border/g, '')
      })
    }

    let periodInputValue = inputPeriod.value
    let separatorPeriod = ' - ';
    let arrayPeriod = periodInputValue.split(separatorPeriod);

    /* Валидация при не соответствии формата даты */
    if (arrayPeriod.length == 2) {

      let arrayStartDate = arrayPeriod[0].split(".");
      let arrayEndDate = arrayPeriod[1].split(".");
      let arrayStartMonth = Number(arrayStartDate[1]) - 1;
      let arrayEndMonth = Number(arrayEndDate[1]) - 1;
      let d1 = new Date(Number(arrayStartDate[2]), arrayStartMonth, Number(arrayStartDate[0]));
      let d2 = new Date(Number(arrayEndDate[2]), arrayEndMonth, Number(arrayEndDate[0]));

      if ((d1.getFullYear() == Number(arrayStartDate[2]))
        && (d1.getMonth() == arrayStartMonth)
        && (d1.getDate() == Number(arrayStartDate[0]))
        && (arrayStartDate[2].length == 4)
        && (arrayStartDate[1].length == 2)
        && (arrayStartDate[0].length == 2)
        && (d2.getFullYear() == Number(arrayEndDate[2]))
        && (d2.getMonth() == arrayEndMonth)
        && (d2.getDate() == Number(arrayEndDate[0]))
        && (arrayEndDate[2].length == 4)
        && (arrayEndDate[1].length == 2)
        && (arrayEndDate[0].length == 2)) {

        updateInputPeriod((draft) => {
          draft.errorField = false
          draft.isNull = false
          draft.newClass = draft.newClass.replace(/error-border/g, '')
        })
      } else {
        updateInputPeriod((draft) => {
          draft.errorField = true
          draft.isNull = false
          draft.newClass = draft.newClass.concat(" error-border")
        })
      }

    } else if(inputPeriod.value) {
      updateInputPeriod((draft) => {
        draft.errorField = true
        draft.isNull = false
        draft.newClass = draft.newClass.concat(" error-border")
      })
    }
  }


  useEffect(() => {

    /* Валидация поля Номер ВЗН */
    if (Number(inputVznNumber.value) < 0
      || !Number.isInteger(Number(inputVznNumber.value))
      || inputVznNumber.value.length > 20
      || inputVznNumber.value !== inputVznNumber.value.replace(/[^\d]/g, "")) {

      updateInputVznNumber((draft) => {
        draft.errorField = true
        draft.isNull = false
        draft.newClass = draft.newClass.concat(" error-border")
      })
    } else {
      updateInputVznNumber((draft) => {
        draft.errorField = false
        draft.isNull = false
        draft.newClass = draft.newClass.replace(/error-border/g, '')
      })
    }

    /* Валидация поля Отправитель */
    if (inputSender.value.length >= 5) {
      updateInputSender((draft) => {
        draft.errorField = true
        draft.isNull = false
        draft.newClass = draft.newClass.concat(" error-border")
      })
    } else {
      updateInputSender((draft) => {
        draft.errorField = false
        draft.isNull = false
        draft.newClass = draft.newClass.replace(/error-border/g, '')
      })
    }

    /* Валидация поля Получатель */
    if (inputRecipient.value.length >= 5) {
      updateInputRecipient((draft) => {
        draft.errorField = true
        draft.isNull = false
        draft.newClass = draft.newClass.concat(" error-border")
      })
    } else {
      updateInputRecipient((draft) => {
        draft.errorField = false
        draft.isNull = false
        draft.newClass = draft.newClass.replace(/error-border/g, '')
      })
    }

  }, [inputVznNumber.value, inputSender.value, inputRecipient.value]);


  return (
    <>
      <div className="modal" id="filter">
        <main className="filter">
          <div className="filter__header">
            <img className="filter__header-close" src="./img/filter/close.svg" alt="close" id="close-filter"
                 onClick={handleCloseModalFilter}/>
            <h1 className="filter__title">
              Фильтр ВЗН УП
            </h1>
          </div>

          <form className="filter__form" action="" id="form">

            <Input
              type="text"
              name="vzn-number"
              title="Номер ВЗН"
              placeholder="ВЗН №7063041"
              addClass={inputVznNumber.newClass}
              inputValue ={inputVznNumber.value}
              updateValue={updateInputVznNumber}
              validateValue={inputVznNumber.errorField}
              isNull={inputVznNumber.isNull}
              textError="целое положительное число до 20 знаков"
            />

            <Input
              type="text"
              name="sender"
              title="Отправитель"
              placeholder="Цех 01"
              addClass={inputSender.newClass}
              inputValue ={inputSender.value}
              updateValue={updateInputSender}
              validateValue={inputSender.errorField}
              isNull={inputSender.isNull}
              textError="строка до 50 символов"
            />

            <Input
              type="text"
              name="recipient"
              title="Получатель"
              placeholder="Цех 02"
              addClass={inputRecipient.newClass}
              inputValue ={inputRecipient.value}
              updateValue={updateInputRecipient}
              validateValue={inputRecipient.errorField}
              isNull={inputRecipient.isNull}
              textError="строка до 50 символов"
            />

            <Input
              type="text"
              name="period"
              title="Дата принятия (период)"
              placeholder="01.01.2020 - 01.01.2024"
              addClass={inputPeriod.newClass}
              inputValue ={inputPeriod.value}
              updateValue={updateInputPeriod}
              validateValue={inputPeriod.errorField}
              isNull={inputPeriod.isNull}
              textError='диапазон дат в формате "dd.mm.yyyy - dd.mm.yyyy"'
            />

            <div className="filter__form-btns">
              <Button
                type="button"
                classBtn="filter__form-search"
                text="Поиск"
                onClickBtn={handleSearch}
              />

              <Button
                type="button"
                classBtn="filter__form-cancel"
                text="Отмена"
                onClickBtn={handleCloseModals}
              />

            </div>
          </form>
        </main>
      </div>
    </>
  )
}

export default ModalVznList
