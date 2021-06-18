(async () => {
    const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    const interface = [{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"candidates","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[{"internalType":"string","name":"_candidate","type":"string"}],"name":"voteFor","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"_candidate","type":"string"}],"name":"votesReceived","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function","constant":true}];
    const VotingContract = new web3.eth.Contract(interface, '0x254dffcd3277C0b1660F6d42EFbB754edaBAbC2B');
    
    // Default account is used if you don't specify from in function call.
    const defaultAddress = (await web3.eth.getAccounts())[0];
    console.log('defaultAddress', defaultAddress)
    
    const tableElem = document.getElementById("table-body");
    const candidateOptions = document.getElementById("candidate-options");
    const voteForm = document.getElementById("vote-form");
    
    async function handleVoteForCandidate(evt) {
        evt.preventDefault()
        const candidate = new FormData(evt.target).get("candidate");
        console.log('cand', candidate)
        
        let res = await VotingContract.methods.voteFor(candidate).send({ from: defaultAddress });
        console.log('res' , res)
        const votes = await VotingContract.methods.votesReceived(candidate).call();

        // Updates the vote element.
        document.getElementById("vote-" + candidate).innerText = votes;
    }
    
    voteForm.addEventListener("submit", handleVoteForCandidate, false);
    
    async function populateCandidates() {
      const candidateList = ["fede", "gomix"]
      candidateList.forEach(async (candidate) => {
        const candidateName = candidate;
        const votes = await VotingContract.methods.votesReceived(candidate).call();
        
        // Creates a row element.
        const rowElem = document.createElement("tr");
    
        // Creates a cell element for the name.
        const nameCell = document.createElement("td");
        nameCell.innerText = candidateName;
        rowElem.appendChild(nameCell);
    
        // Creates a cell element for the votes.
        const voteCell = document.createElement("td");
        voteCell.id = "vote-" + candidate; 
        voteCell.innerText = votes;
        rowElem.appendChild(voteCell);
    
        // Adds the new row to the voting table.
        tableElem.appendChild(rowElem);
    
        // Creates an option for each candidate
        const candidateOption = document.createElement("option");
        candidateOption.value = candidate;
        candidateOption.innerText = candidateName;
        candidateOptions.appendChild(candidateOption);
      });
    }
    
    populateCandidates();
})();