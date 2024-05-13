import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Image,
} from 'react-native';
import {choices} from './src/data/mockData';
import {COLORS} from './src/util/constant';

const App = () => {
  const [userChoice, setUserChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState(null);
  const [userScore, setUserScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);

  const handleUserChoice = userChoice => {
    setUserChoice(userChoice);
    randomComputerChoice(userChoice);
  };

  const randomComputerChoice = userChoice => {
    const randomIndex = Math.floor(Math.random() * choices.length);
    const computerChoice = choices[randomIndex];
    setComputerChoice(computerChoice);
    determineWinner(userChoice, computerChoice);
  };

  const determineWinner = (user, computer) => {
    if (user.name === computer.name) {
      setResult('DRAW!!');
    } else if (
      (user.name === 'rock' && computer.name === 'scissors') ||
      (user.name === 'rock' && computer.name === 'su') ||
      (user.name === 'paper' && computer.name === 'rock') ||
      (user.name === 'paper' && computer.name === 'su') ||
      (user.name === 'scissors' && computer.name === 'paper') ||
      (user.name === 'scissors' && computer.name === 'su') ||
      (user.name === 'fire' && computer.name === 'scissors') ||
      (user.name === 'fire' && computer.name === 'paper') ||
      (user.name === 'fire' && computer.name === 'rock') ||
      (user.name === 'su' && computer.name === 'fire')
    ) {
      setResult('YOU WIN!!');
      setUserScore(prevScore => prevScore + 1);
    } else {
      setResult('COMPUTER WIN!!');
      setComputerScore(prevScore => prevScore + 1);
    }
  };

  const resetGame = () => {
    setUserChoice(null);
    setComputerChoice(null);
    setResult(null);
    setUserScore(0);
    setComputerScore(0);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'light-content'} />
      <View style={styles.container}>
        <Text style={styles.title}> ROCK PAPER SCISSORS</Text>
        <View>
          <Text style={styles.title2}> FRIENDS VERSION</Text>
        </View>
        <Text style={styles.choiceText}> YOUR CHOICE </Text>
        <View style={styles.choices}>
          {choices.map(choice => (
            <TouchableOpacity
              key={`${choice.id}-choice`}
              style={
                choice.name === userChoice?.name
                  ? [styles.button, styles.activeButton]
                  : styles.button
              }
              onPress={() => handleUserChoice(choice)}>
              <Image source={choice.image} style={styles.image} />
            </TouchableOpacity>
          ))}
        </View>
        <Text style={styles.resultText}>{result}</Text>
        {computerChoice && (
          <>
            <Text style={styles.choiceText}> PC Choice </Text>
            <View style={styles.button}>
              <Image source={computerChoice.image} style={styles.image} />
            </View>
          </>
        )}
        <View style={styles.scoreContainer}>
          <Text style={styles.scoreText}>Your Score: {userScore}</Text>
          <Text style={styles.scoreText}>Computer Score: {computerScore}</Text>
        </View>
        <TouchableOpacity style={styles.resetButton} onPress={resetGame}>
          <Text style={styles.resetText}>Reset Game</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.white,
    marginBottom: 2,
  },
  title2: {
    fontSize: 12,
    fontWeight: 'bold',
    color: COLORS.white,
    marginBottom: 50,
    marginLeft: 250,
  },

  choiceText: {
    marginVertical: 20,
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  choices: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: 10,
  },
  image: {
    width: 65,
    height: 160,
    borderRadius: 20,
  },
  button: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: COLORS.backplan,
  },
  resultText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    color: COLORS.white,
  },
  activeButton: {
    borderWidth: 4,
    borderColor: 'red',
  },
  scoreContainer: {
    marginTop: 20,
  },
  scoreText: {
    fontSize: 18,
    color: COLORS.white,
  },
  resetButton: {
    marginTop: 20,
    backgroundColor: COLORS.buton,
    padding: 10,
    borderRadius: 10,
  },
  resetText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
