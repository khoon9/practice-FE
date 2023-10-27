import React, { useEffect, useState } from "react";
import Type from "./Type";
import { DamageRelations as DamageRelationsProps } from "../types/DamageRelationOfPokemonTypes";
import {
  Damage,
  DamageFromAndTo,
  SeperateDamages,
} from "../types/SeperateDamageRelations";
interface DamageModalProps {
  damages: DamageRelationsProps[];
}
interface Info {
  url: string;
  name: string;
}

const DamageRelations = ({ damages }: DamageModalProps) => {
  const [damagePokemonForm, setDamagePokemonForm] = useState<SeperateDamages>();
  useEffect(() => {
    const arrayDamage = damages.map((damage: DamageRelationsProps) =>
      separateObjectBetweenToAndFrom(damage)
    );
    if (arrayDamage.length === 2) {
      const obj = joinDamageRelations(arrayDamage);
      setDamagePokemonForm(reduceDuplicateValues(postDamageValue(obj.from)));
    } else {
      setDamagePokemonForm(postDamageValue(arrayDamage[0].from));
    }
  }, []);

  const reduceDuplicateValues = (props: SeperateDamages): SeperateDamages => {
    const duplicateValues = {
      double_damage: "4x",
      half_damage: "1/4x",
      no_damage: "0x",
    };
    return Object.entries(props).reduce((acc, [keyName, value]) => {
      const key = keyName as keyof typeof props;
      const verifiedValue = filterForUniqueValues(value, duplicateValues[key]);

      return { ...acc, [keyName]: verifiedValue };
    }, {});
  };

  const filterForUniqueValues = (
    valueForFiltering: Damage[],
    damageValue: string
  ) => {
    const initialArray: Damage[] = [];
    return valueForFiltering.reduce((acc, currentValue) => {
      const { url, name } = currentValue;
      const filterACC = acc.filter((i) => i.name !== name);
      return filterACC.length === acc.length
        ? [...acc, currentValue]
        : [...filterACC, { damageValue: damageValue, name, url }];
    }, initialArray);
  };

  const joinDamageRelations = (props: DamageFromAndTo[]): DamageFromAndTo => {
    return {
      to: joinObject(props, "to"),
      from: joinObject(props, "from"),
    };
  };
  const joinObject = (props: DamageFromAndTo[], string: string) => {
    const key = string as keyof (typeof props)[0];
    const firstArrayValue = props[0][key];
    const secondArrayValue = props[1][key];
    return Object.entries(secondArrayValue).reduce(
      (acc, [keyName, value]: [string, Damage]) => {
        const key = keyName as keyof typeof firstArrayValue;
        const result = firstArrayValue[key]?.concat(value);
        return { ...acc, [keyName]: result };
      },
      {}
    );
  };

  // Object.entries 을 사용하면 key와 value 을 하나의 인덱스에 넣고 0 index 와 1 index 에 위치한다.
  // 배열 구조분해 할당과 함께사용할 경우 매우 편리한 조작이 가능해진다.
  const postDamageValue = (props: SeperateDamages): SeperateDamages => {
    return Object.entries(props).reduce((acc, [keyName, value]) => {
      const key = keyName as keyof typeof props;
      const valuesOfKeyName = {
        double_damage: "2x",
        half_damage: "1/2x",
        no_damage: "0x",
      };
      return {
        ...acc,
        [keyName]: value.map((i: Info) => ({
          damageValue: valuesOfKeyName[key],
          ...i,
        })),
      };
    }, {});
  };

  const separateObjectBetweenToAndFrom = (
    damage: DamageRelationsProps
  ): DamageFromAndTo => {
    const from = filterDamageRelations("_from", damage);
    const to = filterDamageRelations("_to", damage);
    return { from, to };
  };
  const filterDamageRelations = (
    valueFilter: string,
    damage: DamageRelationsProps
  ): SeperateDamages => {
    return Object.entries(damage)
      .filter(([keyName, _]) => {
        return keyName.includes(valueFilter);
      })
      .reduce((acc, [keyName, value]) => {
        const keyWithValueFilterRemove = keyName.replace(valueFilter, "");
        return { ...acc, [keyWithValueFilterRemove]: value };
      }, {});
  };
  return (
    <div className="flex flex-col">
      {damagePokemonForm && (
        <>
          {Object.entries(damagePokemonForm).map(
            ([keyName, value]: [string, Damage[]]) => {
              const key = keyName as keyof typeof damagePokemonForm;
              const ValueOfKeyName = {
                double_damage: "Week",
                half_damage: "Resistant",
                no_damage: "Immune",
              };
              return (
                <div key={key}>
                  <h3 className=" capitalize font-medium text-sm md:text-base text-slate-500 text-center">
                    {ValueOfKeyName[key]}
                  </h3>
                  <div className="flex flex-wrap gap-1 justify-center">
                    {value.length > 0 ? (
                      value.map(({ name, url, damageValue }) => {
                        return (
                          <Type
                            type={name}
                            key={url}
                            damageValue={damageValue}
                          />
                        );
                      })
                    ) : (
                      <Type type={"none"} key={"none"} damageValue="" />
                    )}
                  </div>
                </div>
              );
            }
          )}
        </>
      )}
    </div>
  );
};

export default DamageRelations;
