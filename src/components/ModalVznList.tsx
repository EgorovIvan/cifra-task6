import {useEffect, useState} from 'react'
import VznItem from "./VznItem.tsx";
import axios from "axios";
import * as React from "react";



interface List {
  id: number;
  vzn_number: string;
  sender: string;
  recipient: string;
  date_issue: string;
}

const ModalVznList: React.FC<{ handleOpenModalFilter: () => void }> = ({handleOpenModalFilter}) => {
  const [vznList, setVznList] = useState<List[]>([])

  useEffect(() => {
    const apiUrl = 'api/list.json';
    axios.get(apiUrl).then((response) => {
      setVznList(response.data.list)
      console.log(response.data.list)
    });

  }, []);
  return (
    <>
      <div className="modal" id="consumption">
        <main className="list-vzn content">
          <div className="container">
            <div className="list-vzn__header">
              <h1 className="list-vzn__title">
                ВЗН УП (Расход)
              </h1>
              <div className="list-vzn__header-btns">
                <button type="button" className="list-vzn__header-btn" id="filter-btn" onClick={handleOpenModalFilter}>
                  <img src="./img/list/search.svg" alt="search"/>
                  <span>Поиск</span>
                </button>
                <button type="submit" className="list-vzn__header-btn">
                  <img src="./img/list/create.svg" alt="create"/>
                  <span>Создать</span>
                </button>
              </div>
            </div>

            <ul className="list-vzn__block" id="list">
              {/*api*/}
              {vznList.map((item) => (
                <VznItem key={item?.id} item={item}/>
              ))}
            </ul>
          </div>
        </main>
      </div>
    </>
  )
}

export default ModalVznList
