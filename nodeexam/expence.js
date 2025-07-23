import readline from 'readline'

const rl = readline.createInterface({
    input: process.stdin,
    output:process.stdout,
})

const expenceMap = new Map();

function showMenu() {
    console.log(`
    =====Expence Manager=====
    1.Add Expence
    2.View All Expences
    3.Update an EXpences
    4.Delete an expences
    5.Show Total Expences
    6.Exit
`)
    rl.question('Choose an option (1, 2, or 3): ', handleOption);
}

function handleOption(option) {
    switch (option.trim()) {
        case '1':
            rl.question(`Enter expence to add`, (expence) => {
                rl.question(`Enter description:`, (description) => {
                    rl.question(`Enter Amount:`, (amount) => {
                        if (expence.trim() !== '' & description.trim() !== '' & amount.trim() !== '') {
                    const expenceId = expenceMap.size + 1;
                            expenceMap.set(expenceId, {
                                name: expence.trim(),
                                description: description.trim(),
                                amount: parseFloat(amount),
                            });
                    console.log(`Expence added: [${expenceId}] :${expence}:  ${description} :${amount}`);
                } else {
                    console.log('Please specify a valid Expence data.');
                }
                showMenu();3
                    });
                });
            });
            break;
        case '2':
            if (expenceMap.size > 0) {
                console.log(`Expences:`);
                for (const [id, expence] of expenceMap.entries()) {
                    console.log(`[ ${id}]  ${expence.description}${expence.amount} `);
                }
            } else {
                console.log('No Expence available.');

            }
            showMenu();
            break;
            
        case '3':
        if (expenceMap.size === 0) {
            console.log('There are no expence to update.');
            showMenu();
            return;
        }
            
            rl.question('Enter expence ID to update: ', (id) => {
                const expenceId = parseInt(id.trim());
                if (expenceMap.has(expenceId)) {
                    rl.question('Enter new expence: ', (newExpence) => {
                        rl.question('Enter new description: ', (newDescription) => {
                            rl.question('Enter new amount: ', (newAmount) => {
                        
                                if (newExpence.trim() !== '' & newDescription.trim() !== '' & newAmount.trim() !== '') {
                            expenceMap.set(expenceId, newExpence.trim(), newDescription.trim(), newAmount.trim());
                            console.log(`expence [${expenceId}] updated.`);
                        } else {
                            console.log('Expence cannot be empty.');
                        }
                        showMenu();
                            });
                        });
                    });
                } else {
                    console.log(' Invalid expenceId.');
                    showMenu();
                }
            });
            break;
        case '4': 
            if (expenceMap.size === 0) {
                console.log('No expence to delete.');
                showMenu();
                return;
            }

            console.log('\n Current Expence:');
            for (const [id, expence] of expenceMap.entries()) {
                console.log(`[${id}] ${expence}`);
            }
            rl.question('Enter Expence ID to delete: ', (id) => {
                const expenceId = parseInt(id.trim());
                if (expenceMap.has(expenceId)) {
                    expenceMap.delete(expenceId);
                    console.log(`Expence [${expenceId}] deleted.`);
                } else {
                    console.log('Invalid Expence ID.');
                }
                showMenu();
            });
            break;
        case '5':
            console.log('Total expence ');
            
            break;
        case '6': 
            console.log('Exiting expence Manager');
            rl.close(); 
            break;
        default: 
            console.log('Invalid option. Please choose 1, 2, or 3.');
            showMenu(); 
            break;
    }

}
showMenu(); 
