type PluralForms = string[];

export const getPluralForm = ({
  number,
  forms,
}: {
  number: number;
  forms: PluralForms;
}) => {
  const mod10 = number % 10;
  const mod100 = number % 100;

  if (!number) {
    return forms[0];
  }

  if (mod10 === 1 && mod100 !== 11) {
    return forms[1];
  } else if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) {
    return forms[2];
  } else {
    return forms[3];
  }
};
