const Person = {
  data() {
    return {
      refereeList: []
      }
  },

  methods: {
    fetchRefereeList() {
        fetch('/api/referee/index.php')
        .then( response => response.json() )
        .then( (responseJson) => {                
            this.refereeList = responseJson;                
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

Vue.createApp(Controller).mount('#controller')