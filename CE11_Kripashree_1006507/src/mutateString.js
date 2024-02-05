function mutateString(inputString) {
    // 1. Check string len
    if (inputString.length < 2) {
        throw new Error('Input string must have at least two characters.');
    }

    // 2. random index generator
    const randomIndex = Math.floor(Math.random() * (inputString.length - 1));

    // 3. char swap
    const mutatedString = inputString.split('');
    const temp = mutatedString[randomIndex];
    mutatedString[randomIndex] = mutatedString[randomIndex + 1];
    mutatedString[randomIndex + 1] = temp;

    // 4. Return the mutated string
    return mutatedString.join('');
}

export default mutateString;