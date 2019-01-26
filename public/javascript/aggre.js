$(".max").click(function(){
    var column=$(this).attr('name');
    var aggre =$(this).attr('class').match(/max+/)[0];
    console.log(aggre);
    $.post("http://localhost:5000/aggre",{column:column,aggre:aggre},function(data){
        if(data==='done')
        {
            window.location.href="/dates";
        }
    });

  // $.ajax({
  //   type: "POST",
  //   data: {crypto:crypto,cryptos:cryptos},
  //   url: "months",
  //   success: function(msg){
  //     console.log(cryptos);
  //     window.location.href="/months";
  //   }
  // });
});
$(".min").click(function(){
    var column=$(this).attr('name');
    var aggre =$(this).attr('class').match(/min+/)[0];
    console.log(aggre);
    $.post("http://localhost:5000/aggre",{column:column,aggre:aggre},function(data){
        if(data==='done')
        {
            window.location.href="/dates";
        }
    });

  // $.ajax({
  //   type: "POST",
  //   data: {crypto:crypto,cryptos:cryptos},
  //   url: "months",
  //   success: function(msg){
  //     console.log(cryptos);
  //     window.location.href="/months";
  //   }
  // });
});

$(".avg").click(function(){
    var column=$(this).attr('name');
    var aggre =$(this).attr('class').match(/avg+/)[0];
    console.log(aggre);
    $.post("http://localhost:5000/aggre",{column:column,aggre:aggre},function(data){
        if(data==='done')
        {
            window.location.href="/dates";
        }
    });

  // $.ajax({
  //   type: "POST",
  //   data: {crypto:crypto,cryptos:cryptos},
  //   url: "months",
  //   success: function(msg){
  //     console.log(cryptos);
  //     window.location.href="/months";
  //   }
  // });
});