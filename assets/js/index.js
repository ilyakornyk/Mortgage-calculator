const BASE_URL = `https://fast-woodland-07482.herokuapp.com`;

$("#add_bank").submit( function(event){
    let unindexed_array = $(this).serializeArray();
    let data = {}

    $.map(unindexed_array, function(n, i){
        data[n['name']] = n['value']
    })

    

})


$(".calculate_mortgage").submit(function(event) {
    event.preventDefault();

    let unindexed_array = $(this).serializeArray();
    let data = {}

    $.map(unindexed_array, function(n, i){
        data[n['name']] = n['value']
    })

    let monthPayInput = document.querySelector(`#monthlyPayment`);

    let minUserPayment = document.querySelector(`#downPayment`).value;
    let initialLoan = document.querySelector(`#initialLoan`).value;

    
    fetch(`${BASE_URL}/api/banks`)
        .then((response) => {
            return response.json();
        })
        .then((res) => {

            res.forEach(item => {

                if (item.name == data.options ) {
                    if (minUserPayment >= item.minPayment) {
                        
                        let MonthlyPayment = monthlyPayment(initialLoan,item.loanTerm, item.interestRate);
                        monthPayInput.value = `${MonthlyPayment}$`;
        
                    } else {
                        alert(`Your downpayment is too low`);
                    }
                }
            })

 
        });
})


$("#update_bank").submit(function(event){
    event.preventDefault();

    let unindexed_array = $(this).serializeArray();
    let data = {}

    $.map(unindexed_array, function(n, i){
        data[n['name']] = n['value']
    })


    var request = {
        "url" : `${BASE_URL}/api/banks/${data.id}`,
        "method" : "PUT",
        "data" : data
    }

    $.ajax(request).done(function(response){
        window.location.replace("/");
        alert("Data Updated Successfully!");
    }).fail(error => {
        alert(`There is a bank with the same name.`)
    })

})

if(window.location.pathname == "/"){
    $ondelete = $(".table tbody td a.delete");
    $ondelete.click(function(){
        var id = $(this).attr("data-id")

        var request = {
            "url" : `${BASE_URL}/api/banks/${id}`,
            "method" : "DELETE"
        }

        if(confirm("Do you really want to delete this record?")){
            $.ajax(request).done(function(response){
                alert("Data Deleted Successfully!");
                location.reload();
            })
        }

    })
}

let calculateBtn = document.querySelectorAll(`.calculate_mortgage`);

// Calculation formula
function monthlyPayment(p, n, i) {
    i= i /100 / 12;

  return (p * i * (Math.pow(1 + i, n)) / (Math.pow(1 + i, n) - 1)).toFixed(2);
}
