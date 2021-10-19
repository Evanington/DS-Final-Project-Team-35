const Controller = {
  data() {
    return {
      'refereeList': []
      }
  },

  methods: {
    fetchRefereeList() {
        fetch('/api/referee/index.php')
        .then( response => response.json() )
        .then( (parsedJson) => {                
            this.refereeList = parsedJson;                
        })
        .catch( (err) => {
            console.error(err);
        })
    }
},
created() {
    this.fetchRefereeList();
}
}

Vue.createApp(Controller).mount('#controller');