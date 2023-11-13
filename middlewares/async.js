// Dry Principle, sem esse handler teria que
// repetir o bloco de try catch
export const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);
