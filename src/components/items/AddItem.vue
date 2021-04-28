<template>
    <div>

  <v-snackbar v-model="snackbar_pro_added" centered color="#4DB6AC" class="overline font-weight-black" top>
      Acution added successfully !
      <template v-slot:action="{ attrs }">
        <v-icon color="white" text v-bind="attrs" @click="snackbar_pro_added = false">
          clear
        </v-icon>
      </template>
    </v-snackbar>


        <v-row justify="end">
        <v-dialog v-model="dialog" persistent max-width="700px" class="d-none">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark v-bind="attrs" v-on="on">
              <v-icon>add</v-icon>
              <span right>Add Item</span>
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">Add product</span>
              <v-icon>add</v-icon>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field label="Name*" hint="Name of the product" v-model="product.name" required>
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field label="Price*" hint="price of the product" v-model="product.price" type="number">
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" sm="8" md="8">
                    <v-textarea label="Discription" hint="Discripton of the thate going to present on the bidding"
                      persistent-hint required v-model="product.description"></v-textarea>
                  </v-col>
                  <v-col cols="12" sm="4" md="4">
                    <v-select v-model="product.category" :items="categories" item-text="category_name" item-value="id"
                      label="Select" persistent-hint single-line></v-select>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <input type="file" @change="imageChange" class="form-control-file">
                  </v-col>
                </v-row>
              </v-container>
              <small>*indicates required field</small>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn class="white--text" color="primary" small @click="dialog = false">
                Close
              </v-btn>
              <v-btn class="white--text" color="primary" :loading="loading" small @click="postProduct">
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </div>
</template>

<script>
 import {
    mapActions,
    mapGetters
  } from 'vuex';
export default {
     data() {
      return {
           dialog: false,
           loading: false,
           snackbar_pro_added:false,
              product: {
          name: '',
          price: '',
          description: '',
          category: '',
          image: null
        },
      }
    },
    created(){
       this.fatchCategories()
    },
    computed:{
        ...mapGetters(['categories','user'])
    },
    methods: {
        ...mapActions(['postpro','fatchCategories','User_products']),
      imageChange(e) {
        let reader = new FileReader();
        reader.readAsDataURL(e.target.files[0])
        reader.onload = (e) => {
          this.productImage = e.target.result
          this.product.image = e.target.result
          this.editItems.image = e.target.result
        }
      },
      postProduct() {
        this.loading = true;
        const config = {
          headers: {
            'content-type': 'multipart/form-data'
          }
        }
        this.postpro(this.product, config)
          .then(() => {
            this.loading = false;
            this.dialog=false;
            this.User_products(this.user.id);
            this.$emit('Acution_added');                      
          })
      }
    },
}
</script>