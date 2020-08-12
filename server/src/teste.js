const list = [1, 2, 3, 4, 5];

const functionWithPromise = item => {
  return Promise.resolve(`ok: ${item}`);
};

const anAsyncFunction = async item => {
  return functionWithPromise(item);
};

const getData = async () => {
  return Promise.all(list.map(item => anAsyncFunction(item)));
};

getData().then(data => {
  console.log(data);
});
