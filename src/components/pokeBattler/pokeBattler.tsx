import { useEffect, useRef } from "react";
import BattlerItem from "../battlerItem.tsx/battlerItem";

const PokeBattler = ({
  team,
  battleState,
  start,
  battleEnded,
  changeBattleState,
  activeCharacter,
}: {
  team: any;
  battleState: any;
  start: boolean;
  battleEnded: boolean;
  changeBattleState: (data: any) => void;
  activeCharacter: number;
}) => {
  const intervalRef = useRef(null);

  //   useEffect(() => {
  //     if (start && battleEnded === null) {
  //       const atkAction = () => {
  //         const basicActionData = {
  //           damage: data.stats.ATK + data.basic.power,
  //           effect: {},
  //           atkOwner: data.id,
  //         };

  //         changeBattleState(basicActionData);
  //       };

  //       intervalRef.current = setInterval(atkAction, data.basic.speed * 1000);
  //     } else {
  //       clearInterval(intervalRef.current);
  //     }
  //   }, [start, battleEnded]);

  //   console.log("RDX--: ", team);

  return (
    <div style={{ width: "250px", display: "flex", flexDirection: "column" }}>
      {team.team.length > 0 &&
        team.team.map((teamItem: any, index: number) => (
          <BattlerItem
            teamId={team.teamId}
            data={teamItem}
            start={start}
            battleEnded={battleEnded}
            changeBattleState={changeBattleState}
            key={`${teamItem.id}-${team.teamId}`}
            isActive={activeCharacter === index}
          />
        ))}
    </div>
  );
};

export default PokeBattler;
