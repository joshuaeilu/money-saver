 const getPasswordStrength = (password: string) => {
  let score = 0;
  if (password.length > 5) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  if (password.length > 8) score++;

  return score; // score is between 0 and 5
};

 function getStrengthColor(score: number) {
  if (score <= 1) return '#FF0000'; // red
  if (score === 2) return '#FFA500'; // orange
  if (score === 3) return '#FFFF00'; // yellow
  if (score === 4) return '#89964E'; // green
  return '#006400'; // dark green
}

export { getPasswordStrength, getStrengthColor };