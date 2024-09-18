import Header from "../components/Header.tsx";
import {useImmer} from "use-immer";
import CategoriesList from "../components/CategoriesList.tsx";
import {useEffect} from "react";


export interface Task {
  guid: string;
  title: string;
  completed: boolean;
}

export interface Category {
  guid: string;
  name: string;
  tasks: Task[];
}

const initialCategoriesList = [
  {
    guid: "5D9BE8CE-66AB-5CF8-6881-43B88D6F17E9",
    name: "Backlog",
    tasks: [
      {
        guid: "D0DF03EF-AD86-2125-1B85-9DCE4C94F73B",
        title: "Albuterol",
        completed: true
      },
      {
        guid: "E19C7B45-CD7A-B386-663C-A2A0BB77C999",
        title: "Bystolic",
        completed: true
      },
      {
        guid: "C7146744-E45A-DEA2-4E79-74152BDF91C7",
        title: "Symbicort",
        completed: true
      },
      {
        guid: "55ACA97A-B62D-240E-1737-396277517510",
        title: "Penicillin VK",
        completed: true
      },
      {
        guid: "A1D9B3E1-10F8-4116-FBDF-8233E92CE1AE",
        title: "Carisoprodol",
        completed: false
      },
      {
        guid: "C9880C12-5154-84C6-442D-D0EED673ACD9",
        title: "Amphetamine Salts",
        completed: false
      }
    ]
  },
  {
    guid: "8FD6AA6B-389C-9626-ACFA-E15E9E928E55",
    name: "To Do",
    tasks: [
      {
        guid: "D3ACB73B-D4BE-1863-A16B-46CE46F3EF53",
        title: "Pantoprazole Sodium",
        completed: true
      },
      {
        guid: "2969C29C-A763-618C-D884-19B7BFE86175",
        title: "Ventolin HFA",
        completed: true
      },
      {
        guid: "1FD53BB9-A438-069E-792A-5DA88A81640B",
        title: "Suboxone",
        completed: true
      },
      {
        guid: "9BB57CA1-67A5-9BF7-9811-2D0EA48158EC",
        title: "Seroquel",
        completed: false
      },
      {
        guid: "E33EAE27-78C5-342A-66B2-F7B15924696D",
        title: "Fluconazole",
        completed: true
      },
    ]
  },
  {
    guid: "E88CCE77-BAF5-F9BA-51B8-4D474EBE634E",
    name: "Design",
    tasks: [
      {
        guid: "EC51A090-2E52-5D8E-A3C9-1AE930F18DCA",
        title: "Furosemide",
        completed: false
      },
      {
        guid: "256C31F7-0D54-88EC-363A-1CDC69C9D97C",
        title: "Sertraline HCl",
        completed: false
      },
      {
        guid: "4F4966DA-E529-9644-C26C-509D19EFF24A",
        title: "Lidoderm",
        completed: false
      },
      {
        guid: "82EFA2A1-6D2C-A443-C396-C6256DBB4572",
        title: "Zetia",
        completed: false
      },
      {
        guid: "ED8B5D83-CAAB-1F82-B9C6-D51B7E578246",
        title: "Potassium Chloride",
        completed: true
      },
      {
        guid: "D5AEB5BA-E943-48F8-55CB-71BFC8DB980D",
        title: "Actos",
        completed: false
      },
      {
        guid: "319CF551-37D2-6E5A-5C4B-1D6497D86136",
        title: "Advair Diskus",
        completed: true
      },
      {
        guid: "E8D9C541-18A4-4627-51D2-0CDDB5EB6D88",
        title: "Endocet",
        completed: true
      },
    ]
  },
  {
    guid: "C30BBDC9-5315-87DD-6366-1B47B4A27418",
    name: "Doing",
    tasks: [
      {
        guid: "7F56BBED-CEC9-5D21-E8B6-5E2262E33479",
        title: "Venlafaxine HCl ER",
        completed: true
      },
      {
        guid: "8B54949E-BEA6-655D-CDCE-028B1DB1734F",
        title: "Metformin HCl",
        completed: true
      },
      {
        guid: "105E5731-49DE-F718-245A-6F3FB8699595",
        title: "Triamcinolone Acetonide",
        completed: true
      },
      {
        guid: "6843346C-9EC4-BC56-9543-21E31EC58697",
        title: "Ciprofloxacin HCl",
        completed: false
      },
      {
        guid: "F93CB186-66D0-A6BC-89E7-1AE61F125EE1",
        title: "Azithromycin",
        completed: false
      },
      {
        guid: "14B1A1BE-29C7-9B89-148E-C339CBCA07F3",
        title: "Oxycodone HCl",
        completed: true
      },
      {
        guid: "44822C29-99E1-6ED7-548B-079AAF3C2410",
        title: "Glyburide",
        completed: false
      },
      {
        guid: "AB2A1A37-3EA9-768B-846A-57EB9377A672",
        title: "Cymbalta",
        completed: true
      },
      {
        guid: "8E8A797E-8112-168B-A2F3-5528B862A933",
        title: "Hydrocodone/APAP",
        completed: false
      }
    ]
  },
  {
    guid: "A5BC76FD-2E38-368D-C2D5-B12639DED413",
    name: "Code Review",
    tasks: [
      {
        guid: "9BEE29C5-F65C-96E7-2617-71550077C615",
        title: "Tamsulosin HCl",
        completed: false
      },
      {
        guid: "18672967-A9CA-E124-0C9E-8AB2E970DE19",
        title: "Ciprofloxacin HCl",
        completed: true
      },
      {
        guid: "B1E4891A-57DD-B18E-B6F3-F0EC7EB52393",
        title: "Metoprolol Succinate",
        completed: true
      },
      {
        guid: "546E55DC-5594-074D-C174-1DBEFB2AED20",
        title: "Spiriva Handihaler",
        completed: true
      },
      {
        guid: "A56029D7-8EC7-A3FC-7349-7908E1CC5CDB",
        title: "Clonazepam",
        completed: false
      },
      {
        guid: "F510A83A-B184-4756-639E-4B0B9DDFE688",
        title: "Zolpidem Tartrate",
        completed: false
      },
    ]
  },
  {
    guid: "76D21083-0B42-41EB-94FA-D40D8BEC6847",
    name: "Testing",
    tasks: [
      {
        guid: "9ED32D89-A1C4-423A-9563-1E3C4E563C95",
        title: "Lorazepam",
        completed: false
      },
      {
        guid: "8E156CF6-B73D-5C5C-5966-49E279087762",
        title: "Folic Acid",
        completed: true
      },
      {
        guid: "9B11154A-125D-48E9-2A59-61334DFC7EC7",
        title: "Folic Acid",
        completed: false
      },
      {
        guid: "BCEF1D87-5794-9A38-34A4-1873C304CCB8",
        title: "Gabapentin",
        completed: true
      },
      {
        guid: "5D4A35DA-8835-45F7-9EED-8CD11F0EAC0E",
        title: "Metformin HCl",
        completed: true
      },
      {
        guid: "46B75F23-C3FC-B5D3-4D15-270E512E216D",
        title: "Lovaza",
        completed: true
      }
    ]
  },
  {
    guid: "3A48A15E-D5A4-F099-E2DB-412E8C49AE6D",
    name: "Done",
    tasks: [
      {
        guid: "5E491C1E-7584-D71D-468B-DAD1DC7DAA88",
        title: "Simvastatin",
        completed: true
      },
      {
        guid: "CCD7BADF-7E67-48B6-B16C-7CD8DD57E56E",
        title: "Carisoprodol",
        completed: false
      },
      {
        guid: "ADBBC7AC-192B-75FE-3E2D-F8297F52B869",
        title: "Test",
        completed: false
      },
      {
        guid: "9A7AA267-1274-A394-3C5D-E7276119E37C",
        title: "Proair HFA",
        completed: true
      },
      {
        guid: "A2E69582-8A1F-8A23-E18A-492AB3055FB5",
        title: "Loestrin 24 Fe",
        completed: true
      },
      {
        guid: "638F9E36-7D9C-F47C-978A-D65D04A574C3",
        title: "Amitriptyline HCl",
        completed: false
      }
    ]
  }
]

const TaskManager: React.FC = () => {

  const [categories, updateCategories] = useImmer(initialCategoriesList)

  useEffect((): void => {

    if (localStorage.getItem('categories')) {

      const categoriesArray: Category[] | null = JSON.parse(localStorage.getItem('categories'))

      updateCategories((draft): void => {
        // очистка массива
        draft.splice(0, categories.length)
        // заполнение массива
        draft.push(...categoriesArray)
      })
    }

  }, []);

  return (
    <>
      <Header/>
      <main className="task-manager">
        <div className="task-manager__nav">
          <div className="nav-item">
            <h4 className="nav-item__title">Категории</h4>
            <ul className="nav-item__list">

            </ul>
          </div>
          <div className="nav-item">
            <h4 className="nav-item__title">Задачи</h4>
            <ul className="nav-item__list">

            </ul>
          </div>
        </div>
        <div className="task-manager__board">
          <CategoriesList
            categories={categories}
            updateCategories={updateCategories}
          />
        </div>
      </main>
    </>
  )
}

export default TaskManager
