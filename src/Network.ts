interface InputNeuron {
  activation: number;
}

interface Neuron {
  bias: number;
  weights: number[];
}

interface InputLayer {
  neurons: InputNeuron[];
}

interface Layer {
  neurons: Neuron[];
}

interface NeuralNetwork {
  inputSize: number;
  hiddenLayers: Layer[];
  outputLayer: Layer;
}

function sigmoid(x: number) {
  return 1 / (1 + Math.E ** -x);
}

const activationFn = sigmoid;

function getActivation(neuron: Neuron, inputs: number[]): number {
  const totalWeight = neuron.weights.reduce(
    (total, weight, i) => total + weight * inputs[i],
    0,
  );
  return activationFn(totalWeight - neuron.bias);
}

function createRandomValue() {
  return Math.random() * 10 - 5;
}

function createRandomArray(size: number) {
  const result = [];
  for (let i = 0; i < size; i++) {
    result.push(createRandomValue());
  }
  return result;
}

function createRandomLayer(size: number, previousLayerSize: number) {
  const neurons = [];
  for (let i = 0; i < size; i++) {
    neurons.push({
      bias: createRandomValue(),
      weights: createRandomArray(previousLayerSize),
    });
  }
  return { neurons };
}

export function createRandomNetwork(
  sizeOfInputLayer: number,
  sizesOfHiddenLayers: number[],
  sizeOfOutputLayer: number,
): NeuralNetwork {
  return {
    inputSize: sizeOfInputLayer,
    hiddenLayers: sizesOfHiddenLayers.map((size, i) =>
      createRandomLayer(
        size,
        i === 0 ? sizeOfInputLayer : sizesOfHiddenLayers[i - 1],
      ),
    ),
    outputLayer: createRandomLayer(
      sizeOfOutputLayer,
      sizesOfHiddenLayers.length > 0
        ? sizesOfHiddenLayers[sizesOfHiddenLayers.length - 1]
        : sizeOfInputLayer,
    ),
  };
}

function breedNetwork(network: NeuralNetwork): NeuralNetwork {
  // TODO: breed network to return a new neural network via random mutation
  return network;
}

export function runNetwork(
  inputLayer: InputLayer,
  network: NeuralNetwork,
): number[] {
  const inputActivations = inputLayer.neurons.map(
    (neuron) => neuron.activation,
  );

  const finalActivations = [
    ...network.hiddenLayers,
    network.outputLayer,
  ].reduce((previousActivations, layer) => {
    return layer.neurons.map((neuron) => {
      return getActivation(neuron, previousActivations);
    });
  }, inputActivations);

  return finalActivations;
}

// function runNetwork();
