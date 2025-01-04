import { useCallback, useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { fakemonsData } from "./fakemons";
import PokeBattler from "./components/pokeBattler/pokeBattler";

function App() {
  const [battleState, setBattleState] = useState<any>();
  const [battleResult, setBattleResult] = useState<any>(null);
  const [start, setStart] = useState<boolean>(false);

  const handleAttack = useCallback(
    (atkData: any) => {
      setBattleState((prevState: any) => {
        const defensorCharacter =
          prevState.firstCharacterCurrentData.id === atkData.atkOwner
            ? prevState.firstCharacterCurrentData
            : prevState.secondCharacterCurrentData;

        const defensorDamageReduction = defensorCharacter.stats.DEF * 0.5;
        const finalDamage = atkData.damage - defensorDamageReduction;

        const enemyFinalHP = defensorCharacter.stats.HP - finalDamage * 0.1;

        const resultBattleState = {
          ...prevState,
          [`${
            prevState.firstCharacterBaseData.id === atkData.atkOwner
              ? "firstCharacterCurrentData"
              : "secondCharacterCurrentData"
          }`]: {
            ...defensorCharacter,
            stats: {
              ...defensorCharacter.stats,
              HP: enemyFinalHP.toFixed(2),
            },
          },
        };

        if (enemyFinalHP <= 0) {
          setBattleResult(atkData.atkOwner);
        }

        return resultBattleState;
      });
    },
    [battleState, battleResult]
  );

  useEffect(() => {
    const newBattle = {
      firstCharacterBaseData: fakemonsData[0],
      firstCharacterCurrentData: {
        ...fakemonsData[0],
        basic: fakemonsData[0].basic[0],
        special: fakemonsData[0].special[0],
        basicAction: () => {
          const basicActionData = {
            damage: fakemonsData[0].stats.ATK + fakemonsData[0].basic[0].power,
            effect: {},
            atkOwner: fakemonsData[0].id,
          };

          handleAttack(basicActionData);
        },
      },

      secondCharacterBaseData: fakemonsData[1],
      secondCharacterCurrentData: {
        ...fakemonsData[1],
        basic: fakemonsData[1].basic[1],
        special: fakemonsData[1].special[1],
      },
    };

    setBattleState(newBattle);
  }, []);

  console.log("RDX-2: ", battleResult);

  return (
    <div>
      <div>
        {/* <h1>Monte seu time!</h1> */}
        <h1>BATALHA!</h1>
        <button onClick={() => setStart(true)}>INICIAR</button>
      </div>

      {battleState && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div>
            <PokeBattler
              start={start}
              changeBattleState={handleAttack}
              battleEnded={battleResult}
              data={battleState.firstCharacterCurrentData}
            />
          </div>
          <div>
            <PokeBattler
              start={start}
              changeBattleState={handleAttack}
              battleEnded={battleResult}
              data={battleState.secondCharacterCurrentData}
            />
          </div>
        </div>
      )}
      {battleResult && (
        <div style={{ marginTop: "50px" }}>
          {`O vencedor é ${
            fakemonsData.find((pokeData) => pokeData.id === battleResult)?.name
          }`}
        </div>
      )}
    </div>
  );
}

export default App;
