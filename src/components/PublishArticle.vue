<template>
  <page-wrapper :loaded="loaded">
    <auth-form v-model="auth" url="/api/staff/auth" v-if="!auth.accepted"></auth-form>
    <div v-if="auth.accepted">
      <h1>Publish Article</h1>
      <hr />
      <div class="grid">
        <div class="label">Title:</div>
        <b-form-input v-model="title" placeholder="Enter a title..." class="full-input"></b-form-input>
        <div class="label">Category:</div>
        <b-form-select v-model="category" :options="categories" class="full-input"></b-form-select>
        <div class="label">Author:</div>
        <b-form-input
          @update="filterAuthors"
          placeholder="Filter authors by name..."
          class="left-half-input"
        ></b-form-input>
        <b-form-select v-model="author" :options="filteredAuthors" class="right-half-input"></b-form-select>
        <div class="label">Date to publish:</div>
        <b-form-datepicker v-model="dateVisible" :min="today" class="full-input"></b-form-datepicker>
        <div class="label">Header image:</div>
        <b-form-file v-model="headerImage" class="full-input"></b-form-file>
        <div class="label">Article contents:</div>
        <b-form-textarea v-model="contents" no-resize class="full-input monospaced"></b-form-textarea>
        <div class="skip"></div>
        <div class="label">Create new author:</div>
        <b-form-input
          v-model="newAuthor"
          @update="newAuthorState = null"
          :state="newAuthorState"
          placeholder="Enter a new author name..."
          class="left-right-input"
        ></b-form-input>
        <b-button @click="createAuthor" class="end-input">Create</b-button>
        <div class="skip"></div>
        <b-button @click="publish" variant="danger" class="left-half-input">Publish Article</b-button>
        <div v-if="error" class="error">Error: {{error}}</div>
      </div>
      <hr class="mt-5" />
      <h2>Information</h2>
      <ul class="infolist">
        <li>
          Article contents get parsed as Markdown (.md) files, specifically the
          <a
            href="https://commonmark.org/help/"
          >CommonMark dialect</a>, which allows you to use special formatting in articles.
          <strong>
            Any formatting not specified in this way will
            <em>not</em> show up on the published article!
          </strong>
        </li>
        <li>Only JPEG files can be used as header images; you can use online file conversion tools to convert from other image formats to JPEG.</li>
        <li>If an author isn't available in the dropdown list, you can add them using the "Create new author" form above.</li>
      </ul>
    </div>
  </page-wrapper>
</template>

<script>
import PageWrapper from "@/components/PageWrapper";
import AuthForm from "@/components/AuthForm";
import moment from "moment";

export default {
  name: "PublishArticle",
  components: {
    PageWrapper,
    AuthForm
  },
  data() {
    const today = moment().format("YYYY-MM-DD");

    return {
      loaded: false,
      auth: {},
      title: "",
      authors: [],
      filteredAuthors: [],
      author: null,
      categories: [],
      category: null,
      contents: "",
      headerImage: null,
      error: null,
      newAuthor: "",
      newAuthorState: null,
      dateVisible: today,
      today: today
    };
  },
  methods: {
    async load() {
      try {
        await this.loadAuthors();

        const categoriesRes = await this.$http.get(`/api/categories`);
        this.categories = categoriesRes.data.data.categories.map(c => ({
          value: c.id,
          text: `[${c.id}] ${c.label}`
        }));

        this.loaded = true;
      } catch (ex) {
        console.log(ex);
      }
    },

    async loadAuthors() {
      const authorsRes = await this.$http.get(`/api/authors`);
      this.authors = authorsRes.data.data.authors.map(a => ({
        value: a.id,
        text: `[${a.id}] ${a.fullName}`,
        fullName: a.fullName.toLowerCase()
      }));
      this.filteredAuthors = this.authors;
    },

    filterAuthors(value) {
      value = value.toLowerCase();
      this.filteredAuthors = this.authors.filter(a =>
        a.fullName.startsWith(value)
      );
    },

    async createAuthor() {
      if (this.newAuthor === "") {
        this.newAuthorState = false;
        return;
      }

      try {
        this.$http.post("/api/staff/create-author", {
          username: this.auth.username,
          password: this.auth.password,
          fullName: this.newAuthor
        });
      } catch (e) {
        this.newAuthorState = false;
        this.newAuthor = "";
        return;
      }

      this.newAuthorState = true;
      this.newAuthor = "";
      await this.loadAuthors();
    },

    async publish() {
      if (this.title === "") {
        this.error = "Enter a title";
        return;
      }
      if (!this.category) {
        this.error = "Select a category";
        return;
      }
      if (!this.author) {
        this.error = "Select an author";
        return;
      }
      if (this.contents === "") {
        this.error = "Enter article contents";
        return;
      }

      const contentsFile = new File([this.contents], "contents.md", {
        type: "text/plain"
      });

      const timeToPublish = `06:00:00${moment().format("Z")}`;

      const formData = new FormData();
      formData.append("username", this.auth.username);
      formData.append("password", this.auth.password);
      formData.append("title", this.title);
      formData.append("category", this.category);
      formData.append("author", this.author);
      formData.append("dateVisible", `${this.dateVisible} ${timeToPublish}`);
      formData.append("contents", contentsFile);
      if (this.headerImage) {
        formData.append("headerImage", this.headerImage);
      }

      try {
        const res = await this.$http.post(
          "/api/staff/publish-article",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          }
        );

        //this.$router.push({ name: "Article", params: { id: res.data } });
        this.$router.push({ name: "Home" });
      } catch (e) {
        this.error = e.response.data;
        return;
      }
    }
  },
  mounted() {
    this.load();
  }
};
</script>

<style scoped>
.grid {
  width: 50rem;
  max-width: 100%;
  margin-left: auto;
  margin-right: auto;
  display: grid;
  grid-template-columns: 20% 35% 30% 15%;
  grid-template-rows: repeat(5, 2.5rem) 9rem repeat(4, 2.5rem);
  grid-auto-flow: row;
  justify-items: stretch;
  align-items: stretch;
}
.label {
  grid-column: 1 / 2;
  padding-right: 1rem;
  justify-self: right;
  align-self: center;
}
.full-input {
  grid-column: 2 / 5;
}
.left-half-input {
  grid-column: 2 / 3;
}
.right-half-input {
  grid-column: 3 / 5;
}
.left-right-input {
  grid-column: 2 / 4;
}
.end-input {
  grid-column: 4 / 5;
  margin-left: 1em;
}
.skip {
  grid-column: 1 / 5;
}
.monospaced {
  font-family: monospace;
}
.error {
  color: #aa0000;
  grid-column: 3 / 5;
  justify-self: left;
  align-self: center;
  padding-left: 1rem;
}
.infolist {
  width: 60%;
  text-align: left;
  margin-left: auto;
  margin-right: auto;
}
</style>
