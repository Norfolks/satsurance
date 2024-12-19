const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");
const { ethers } = require("ethers");
const { InsuranceSetup } = require("./Insurance");

const BIG_STAKER_ADDR = "0xe63b611C72e046e5FA05C3EaA972F2bbD6E9a1CB";
const POOL_OWNER_ADDR = "0xe1a5328f489C261410563a08a92f1FFdfF045407";

module.exports = buildModule("LocalDeploy", async (m) => {
  const { btcToken, sursToken, insurancePool, governor_c, timelock } =
    m.useModule(InsuranceSetup);

  m.call(insurancePool, "transferOwnership", [POOL_OWNER_ADDR]);
  m.call(btcToken, "transfer", [
    BIG_STAKER_ADDR,
    ethers.parseUnits("200", "ether").toString(),
  ]);
  m.call(btcToken, "transfer", [
    POOL_OWNER_ADDR,
    ethers.parseUnits("10", "ether").toString(),
  ]);

  const send1 = m.send(
    "Send2Staker",
    BIG_STAKER_ADDR,
    BigNum(ethers.parseUnits("10", "ether").toString())
  );
  const send2 = m.send(
    "Send2Owner",
    BIG_STAKER_ADDR,
    BigNum(ethers.parseUnits("10", "ether").toString())
  );

  return { send1, send2 };
});
