 const getPasswordStrength = (password: string) => {
  let score = 0;
  if (password.length > 5) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  if (password.length > 8) score++;

  return score; // score is between 0 and 5
};

const getStrengthColor = (score: number) => {
  if (score <= 2) return 'bg-red-500';
  if (score === 3) return 'bg-yellow-500';
  if (score >= 4) return 'bg-[#89964E]'; // Your theme color
};

export { getPasswordStrength, getStrengthColor };