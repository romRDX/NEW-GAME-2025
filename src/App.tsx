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
        const defensorTeam =
          atkData.teamId === prevState.firstTeamId
            ? prevState.secondTeamCurrentData
            : prevState.firstTeamCurrentData;

        let nextCharacterPosition =
          atkData.teamId === prevState.firstTeamId
            ? prevState.secondTeamActiveCharacter
            : prevState.firstTeamActiveCharacter;

        const defensorCharacter = defensorTeam[nextCharacterPosition];

        const defensorDamageReduction = defensorCharacter.stats.DEF * 0.5;
        const finalDamage = atkData.damage - defensorDamageReduction;

        const enemyFinalHP = defensorCharacter.stats.HP - finalDamage * 0.3;

        if (enemyFinalHP <= 0) {
          nextCharacterPosition += 1;
        }

        console.log("----------------------");
        console.log("ATK-DATA-1: ", defensorCharacter);
        console.log("ATK-DATA-2: ", atkData.atkOwner);
        console.log("ATK-DATA-3: ", nextCharacterPosition);

        const resultBattleState = {
          ...prevState,
          [`${
            atkData.teamId === prevState.firstTeamId
              ? "secondTeamActiveCharacter"
              : "firstTeamActiveCharacter"
          }`]: nextCharacterPosition,
          [`${
            atkData.teamId === prevState.firstTeamId
              ? "secondTeamCurrentData"
              : "firstTeamCurrentData"
          }`]: defensorTeam.map((item: any) => {
            if (item.id === defensorCharacter.id) {
              return {
                ...defensorCharacter,
                stats: {
                  ...defensorCharacter.stats,
                  HP: enemyFinalHP.toFixed(2),
                },
              };
            } else {
              return item;
            }
          }),
        };

        console.log("ATK-DATA-4: ", resultBattleState);

        if (nextCharacterPosition > defensorTeam.length - 1) {
          setBattleResult(atkData.atkOwner);
        }

        return resultBattleState;
      });
    },
    [battleState, battleResult]
  );

  useEffect(() => {
    const newBattle = {
      firstTeamActiveCharacter: 0,
      firstTeamId: 111,
      firstTeamBaseData: [fakemonsData[0], fakemonsData[1], fakemonsData[2]],
      firstTeamCurrentData: [
        ...[fakemonsData[0], fakemonsData[1], fakemonsData[2]].map((poke) => ({
          ...poke,
          basic: poke.basic[0],
          special: poke.special[0],
          basicAction: () => {
            const basicActionData = {
              damage: poke.stats.ATK + poke.basic[0].power,
              effect: {},
              atkOwner: poke.id,
            };

            handleAttack(basicActionData);
          },
        })),
      ],

      secondTeamActiveCharacter: 0,
      secondTeamId: 222,
      secondCharacterBaseData: [
        fakemonsData[1],
        fakemonsData[2],
        fakemonsData[3],
      ],
      secondTeamCurrentData: [
        ...[fakemonsData[1], fakemonsData[2], fakemonsData[3]].map((poke) => ({
          ...poke,
          basic: poke.basic[0],
          special: poke.special[0],
          basicAction: () => {
            const basicActionData = {
              damage: poke.stats.ATK + poke.basic[0].power,
              effect: {},
              atkOwner: poke.id,
            };

            handleAttack(basicActionData);
          },
        })),
      ],
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
              team={{
                team: battleState.firstTeamCurrentData,
                teamId: battleState.firstTeamId,
              }}
              battleState={battleState}
              activeCharacter={battleState.firstTeamActiveCharacter}
            />
          </div>
          <div>
            <PokeBattler
              start={start}
              changeBattleState={handleAttack}
              battleEnded={battleResult}
              team={{
                team: battleState.secondTeamCurrentData,
                teamId: battleState.secondTeamId,
              }}
              battleState={battleState}
              activeCharacter={battleState.secondTeamActiveCharacter}
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
