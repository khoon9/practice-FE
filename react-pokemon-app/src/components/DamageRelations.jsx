import React, { useEffect, useState } from "react";

const DamageRelations = ({ damages }) => {
  const [damagePokemonForm, setDamagePokemonForm] = useState();
  useEffect(() => {
    const arrayDamage = damages.map((damage) =>
      separateObjectBetweenToAndFrom(damage)
    );
    if (arrayDamage.length === 2) {
      const obj = joinDamageRelations(arrayDamage);
      setDamagePokemonForm(reduceDuplicateValues(postDamageValue(obj.from)));
    } else {
      setDamagePokemonForm(postDamageValue(arrayDamage[0].from));
    }
  }, []);

  const reduceDuplicateValues = (props) => {
    const duplicateValues = {
      double_damage: "4x",
      half_damage: "1/4x",
      no_damage: "0x",
    };
    return Object.entries(props).reduce((acc, [keyName, value]) => {
      const key = keyName;
      const verifiedValue = filterForUniqueValues(value, duplicateValues[key]);

      return { ...acc, [keyName]: verifiedValue };
    }, {});
  };
  const filterForUniqueValues = (valueForFiltering, damageValue) => {
    return valueForFiltering.reduce((acc, currentValue) => {
      const { url, name } = currentValue;
      const filterACC = acc.filter((i) => i.name !== name);
      return filterACC.length === acc.length
        ? [...acc, currentValue]
        : [...acc, { damageValue: damageValue, name, url }];
    }, []);
  };

  const joinDamageRelations = (props) => {
    return {
      //   to: joinObject(props, "to"),
      from: joinObject(props, "from"),
    };
  };
  const joinObject = (props, string) => {
    const key = string;
    const firstArrayValue = props[0][key];
    const secondArrayValue = props[1][key];
    return Object.entries(secondArrayValue).reduce((acc, [keyName, value]) => {
      // console.log(acc, [keyName, value]);
      const result = firstArrayValue[keyName].concat(value);
      return { ...acc, [keyName]: result };
    }, {});
  };

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
      return {
        ...acc,
        [keyName]: value.map((i) => ({
          damageValue: valuesOfKeyName[key],
          ...i,
        })),
      };
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
        return { ...acc, [keyWithValueFilterRemove]: value };
      }, {});
  };

  return <div>DamageRelations</div>;
};

export default DamageRelations;
