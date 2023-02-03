import { Button, Row } from "antd";
import React from "react";

function caculateFn() {
  new Promise(function (resolve) {
    setTimeout(() => resolve(1), 1000);
  })
    .then((result1: any) => {
      alert(result1); // 1

      return new Promise((resolve, reject) => {
        // (*)
        setTimeout(() => resolve(result1 * 2), 1000);
      });
    })
    .then((result2: any) => {
      // (**)

      alert(result2); // 2

      return new Promise((resolve, reject) => {
        setTimeout(() => resolve(result2 * 2), 1000);
      });
    })
    .then((result3: any) => {
      alert(result3); // 4
    });
  let result = "";
  return result;
}

function delay(ms: number) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(null);
    }, ms);
  });
}

async function testPromiseAll() {
  let result = await Promise.all([
    new Promise((resolve) => setTimeout(() => resolve(1), 3000)), // 1
    new Promise((resolve) => setTimeout(() => resolve(2), 2000)), // 2
    new Promise((resolve) => setTimeout(() => resolve(3), 1000)), // 3
  ]);

  alert(result);

  //   Promise.all([
  //     new Promise((resolve, reject) => setTimeout(() => resolve(1), 1000)),
  //     new Promise((resolve, reject) =>
  //       setTimeout(() => reject(new Error("Whoops!")), 2000)
  //     ),
  //     new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000)),
  //   ]).catch(alert); // Error: Whoops!
}

async function loadJson(url: string) {
  let response: any = await fetch(url);
  if (response.status == 200) {
    return response.json();
  } else {
    throw new Error(response.status);
  }
}

const CacluateAeara: React.FC = () => {
  const load = () => {
    loadJson("https://javascript.info/no-such-user.json").catch(alert);
  };

  return (
    <div>
      <Row justify={"center"} style={{ margin: 16 }} wrap>
        <div>Caculate Result</div>
      </Row>
      <Row justify={"center"} style={{ margin: 16 }} wrap>
        <div>
          <Button onClick={() => caculateFn()}>Excute</Button>
          <Button onClick={() => delay(1000).then(() => alert("delay"))}>
            delay
          </Button>
          <Button onClick={() => testPromiseAll()}>promise all</Button>
          <Button onClick={() => load()}>load</Button>
        </div>
      </Row>
      <Row
        justify={"center"}
        style={{ border: "1px solid green", minHeight: 400, margin: "0 8px" }}
      >
        content
      </Row>
    </div>
  );
};

export default CacluateAeara;
