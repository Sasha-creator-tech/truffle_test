var DudleToken = artifacts.require("DudleToken");

contract('DudleToken', (accounts) => {
	//If the contract deployed correct test
	it("should deploy smart contarct properly", async () => {
		return await DudleToken.deployed().then((instance) => {
			assert.notEqual(instance.address, '', "There are no address of the contarct");
		})
	})

	//Start owners balance test
	it("should put 1000 tokens in the owners account", async () => {
		return await DudleToken.deployed().then(async (instance) => {
			return await instance.balanceOf.call(accounts[0]);
		}).then((balance) => {
			assert.equal(balance.valueOf(), 1000, "1000 wan't in the account");
		});
	});

	//Total supply test
	it("all values should be set on constructor call", async() => {
		return await DudleToken.deployed().then(async (instance) => {
			return await instance.totalSupply.call();
		}).then((totalSupply) => {
			assert.equal(totalSupply.valueOf(), 1000, "Correct total supply should be set");
		})
	});

	//Token name test
	it("should return the name DudleToken", async () => {
		return await DudleToken.deployed().then(async (instance) => {
			return await instance.name.call();
		}).then((name) => {
			assert.equal(name, "DudleToken", "The name is uncorrect");
		});
	});

	//Token symbol test
	it("should return the symbol DLT", async () => {
		return await DudleToken.deployed().then(async (instance) => {
			return await instance.symbol.call();
		}).then((symbol) => {
			assert.equal(symbol, "DLT", "The symbol is uncorrect");
		});
	});

	//Token decimals test
	it("should return the decimals 1", async () => {
		return await DudleToken.deployed().then(async (instance) => {
			return await instance.decimals.call();
		}).then((decimals) => {
			assert.equal(decimals.valueOf(), 1, "The decimals is uncorrect");
		});
	});

	//Token transfer function test
	it("should transfer right token", async () => {
		var token;
		return await DudleToken.deployed().then(async (instance) => {
			token = instance;
			return await token.transfer(accounts[1], 300);
		}).then(async () => {
			return await token.balanceOf.call(accounts[0]);
		}).then(async (balance) => {
			assert.equal(balance.valueOf(), 700, "The balance of account sender is wrong");
			return await token.balanceOf.call(accounts[1]);
		}).then(async (balance) => {
			assert.equal(balance.valueOf(), 300, "The balance of account reseiver is wrong");
		})
	});

	//Token transferFrom, approve and allowance test
	it("should give sender autority to spend receiver's token", async () => {
		var token;
		return await DudleToken.deployed().then(async (instance) => {
			token = instance;
			return await token.approve(accounts[1], 100);
		}).then(async () => {
			return await token.allowance.call(accounts[0], accounts[1]);
		}).then((amount) => {
			assert.equal(amount.valueOf(), 100, "Allowed amount is wrong");
		}).then(async () => {
			return await token.transferFrom(accounts[0], accounts[2], 100, {
				from: accounts[1]
			});
		}).then(async () => {
			return await token.balanceOf.call(accounts[0]);
		}).then((balance) => {
			assert.equal(balance.valueOf(), 600, "Balance of the owner's account is wrong");
		}).then(async () => {
			return await token.balanceOf.call(accounts[2]);
		}).then((balance) => {
			assert.equal(balance.valueOf(), 100, "Balance of the reseiver's account is wrong")
		}).then(async () => {
			return await token.allowance.call(accounts[0], accounts[1]);
		}).then((amount) => {
			assert.equal(amount.valueOf(), 0, "Allowed amount after sending is wrong")
		})
	});

	//Token transfer event test
	it("should show the transfer event", async () => {
		return await DudleToken.deployed().then(async (instance) => {
			return await instance.transfer(accounts[1], 100);
		}).then((event) => {
			console.log(event.logs[0].event);
		})
	})

	//Token approval event test
	it("should show the approval event", async () => {
		var token;
		return await DudleToken.deployed().then(async (instance) => {
			token = instance;
			return await token.approve(accounts[1], 100);
		}).then((event) => {
			console.log(event.logs[0].event);
		})
	})
});