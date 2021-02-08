const UsersUrl = "http://localhost:3000/users/";
const vm = new Vue({
  el:"#app",
  data:{
    users: [],
    msg:"",
    createUser:
    {
      name:null,
      age:null
    },
  },
  async mounted(){//fetch not async 
    axios.get(UsersUrl).then(res => {
      this.users = res.data
    })
    console.log(this.users);
  },
  methods:{
    async deleteUser(index){
      const id = this.users[index]._id;
      axios.delete(UsersUrl + id);
      this.users.splice(index,1);
    },
    async addUser(){
      await axios.post(UsersUrl,this.createUser);
      await axios.get(UsersUrl).then(res => {
      this.users = res.data;
      })
    },
    async changeUser(index)
    {
      const id = this.users[index]._id;
      await axios.put(UsersUrl + id,this.users[index]);
      alert("user has been updated!");
    }
  }
})