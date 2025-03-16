export const getPasswordStrength = (password?: string): [number, number] | undefined => {
  const strengthRules = [
    { label: 'digit', rule: /\d/ },
    { label: 'upperCase', rule: /[A-Z]/ },
    { label: 'lowCase', rule: /[a-z]/ },
    { label: 'specialChar', rule: /\W/ }
  ];

  if (!password) return undefined;

  const strength = strengthRules.reduce((acc, { rule }) => {
    if (password.match(rule)) {
      acc++;
    }

    return acc;
  }, 0);

  return [ strength, strengthRules.length ]
}
