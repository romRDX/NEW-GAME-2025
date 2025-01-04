import { useEffect, useRef } from "react";

const PokeBattler = ({
  data,
  start,
  battleEnded,
  changeBattleState,
}: {
  data: any;
  start: boolean;
  battleEnded: boolean;
  changeBattleState: (data: any) => void;
}) => {
  const intervalRef = useRef(null);

  useEffect(() => {
    if (start && battleEnded === null) {
      const atkAction = () => {
        const basicActionData = {
          damage: data.stats.ATK + data.basic.power,
          effect: {},
          atkOwner: data.id,
        };

        changeBattleState(basicActionData);
      };

      intervalRef.current = setInterval(atkAction, data.basic.speed * 1000);
    } else {
      clearInterval(intervalRef.current);
    }
  }, [start, battleEnded]);

  return (
    <div style={{ width: "250px", display: "flex", flexDirection: "column" }}>
      <h2>{data.name}</h2>
      <div
        style={{
          width: "100px",
          height: "100px",
          borderRadius: "50%",
          background: data.img,
          margin: "0 auto",
        }}
      ></div>
      <div
        style={{
          width: "100px",
          height: "30px",
          background: "gray",
          margin: "40px auto 0",
          position: "relative",
        }}
      >
        <div
          style={{
            width: `${data.stats.HP <= 0 ? 0 : data.stats.HP}px`,
            height: "inherit",
            background: "lightgreen",
            transition: ".5s",
          }}
        />
        <p
          style={{
            margin: "0 auto",
            position: "absolute",
            top: 0,
            right: 0,
            left: 0,
            lineHeight: "30px",
          }}
        >
          {data.stats.HP <= 0 ? 0 : data.stats.HP}
        </p>
      </div>
    </div>
  );
};

export default PokeBattler;
