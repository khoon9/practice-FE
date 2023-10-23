import React, { useEffect } from "react";

const DamageRelations = ({ damages }) => {
  useEffect(() => {
    const arrayDamage = damages.map((damage) =>
      separateObjectBetweenToAndFrom(damage)
    );
    if (arrayDamage.lenth === 2) {
      // 합치는 부분
    } else {
      console.log(postDamageValue(arrayDamage[0].from));
    }
  }, []);

  // Object.entries 을 사용하면 key와 value 을 하나의 인덱스에 넣고 0 index 와 1 index 에 위치한다.
  // 배열 구조분해 할당과 함께사용할 경우 매우 편리한 조작이 가능해진다.
  const postDamageValue = (props) => {
    return Object.entries(props).reduce((acc, [keyName, value]) => {
      const key = keyName;
      const valuesOfKeyName = {
        double_damage: "2x",
        half_damage: "1/2x",
        no_damage: "0x",
      };
      //   console.log(acc, [keyName, value]);
      return (acc = {
        ...acc,
        [keyName]: value.map((i) => ({
          damageValue: valuesOfKeyName[key],
          ...i,
        })),
      });
    }, {});
  };

  const separateObjectBetweenToAndFrom = (damage) => {
    const from = filterDamageRelations("_from", damage);
    const to = filterDamageRelations("_to", damage);
    return { from, to };
  };
  const filterDamageRelations = (valueFilter, damage) => {
    return Object.entries(damage)
      .filter(([keyName, value]) => {
        return keyName.includes(valueFilter);
      })
      .reduce((acc, [keyName, value]) => {
        const keyWithValueFilterRemove = keyName.replace(valueFilter, "");
        return (acc = { ...acc, [keyWithValueFilterRemove]: value });
      }, {});
  };

  return <div>DamageRelations</div>;
};

export default DamageRelations;
