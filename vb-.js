function enhancedVelocityBankingStrategy(monthlyIncome, expenses, debts, locDetails) {
    let locMonthlyInterestRate = locDetails.annualInterestRate / 12 / 100;
    let disposableIncome = monthlyIncome - expenses - debts.reduce((acc, debt) => acc + debt.minPayment, 0);
    let projections = {};

    for (let month = 1; month <= 12; month++) {
        let locInterest = locDetails.balance * locMonthlyInterestRate;
        locDetails.balance = Math.max(0, locDetails.balance + locInterest - disposableIncome);

        projections[month] = {
            locBalance: locDetails.balance,
            locInterestPaid: locInterest,
            debts: []
        };

        debts.forEach(debt => {
            let debtInterest = debt.balance * (debt.annualInterestRate / 12 / 100);
            let payment = Math.min(debt.balance + debtInterest, debt.minPayment);
            debt.balance -= (payment - debtInterest);

            projections[month].debts.push({
                balance: debt.balance,
                interestPaid: debtInterest,
                type: debt.type
            });
        });
    }

    return projections;
}
