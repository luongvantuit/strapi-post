"use strict";

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register({ strapi }) {
    /**
     * @type {}
     */
    const extensionService = strapi.plugin("graphql").service("extension");
    extensionService.use({
      resolversConfig: {
        "Mutation.createPost": {
          middlewares: [
            async (next, parent, args, context, info) => {
              if (!args.data.user || args.data.user != context.state.user.id) {
                throw "Error create new post! Check your user id!";
              }
              const res = await next(parent, args, context, info);
              return res;
            },
          ],
          auth: true,
        },
        "Mutation.createComment": {
          middlewares: [
            async (next, parent, args, context, info) => {
              if (!args.data.user || args.data.user != context.state.user.id) {
                throw "Error create new post! Check your user id!";
              }
              if (!args.data.post) {
                throw "Post is Empty!";
              }
              const entries = await strapi.entityService.findOne(
                "api::post.post",
                args.data.post
              );
              if (!entries) {
                throw "Can't found post!";
              }
              const res = await next(parent, args, context, info);
              return res;
            },
          ],
        },
      },
    });
  },

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap(/*{ strapi }*/) {},
};
