<template>
  <div class="container">
    <div class="diff" v-for="(user, index) in users" :key="index">
      <div class="user-image">
        <img :src="user.image" alt="User Image" class="avatar">
      </div>
      <p><span class="label">Name:</span> {{ user.name }}</p>
      <p><span class="label">Email:</span> {{ user.email }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login_Component',
  data() {
    return {
      users: [
        {
          name: 'Jonas',
          email: 'jonas.sauer@hs-weingarten.de',
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkZLkfd8TcbE1PMWQMddV8_kOeq0UacbhH0p7zEHdhfw&s'
        },
        {
          name: 'Selchuk',
          email: 'chraloglou.selchuk@hs-weingarten.de',
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkZLkfd8TcbE1PMWQMddV8_kOeq0UacbhH0p7zEHdhfw&s'
        },
        {
          name: 'Michi',
          email: 'XY.XY@hs-weingarten.de',
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkZLkfd8TcbE1PMWQMddV8_kOeq0UacbhH0p7zEHdhfw&s'
        }
      ]
    };
  }
}
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
}

.diff {
  width: 30%;
  padding: 5px;
  border: 1px solid rgb(252, 204, 0);
  backdrop-filter: brightness(60%);
  border-radius: 10px;
  margin-top: 0px;
  margin-right: 20px;
  overflow-y: auto;
  height: 50vh;
}

.user-image {
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
}

.avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}

p {
  display: flex;
  align-items: center;
  color: aliceblue;
  text-align: left;
  margin: 5px auto;
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 5px;
  font-family: 'Pokemon', sans-serif;
  padding-left: 10px;
}

.label {
  font-weight: bold;
  margin-right: 5px;
}
</style>