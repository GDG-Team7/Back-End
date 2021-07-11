'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const tran = await queryInterface.sequelize.transaction();
    try{
      await queryInterface.addConstraint("members", {
        fields: ["user_id"],
        type: "foreign key",
        name: "fk_members_users",
        references: {
          table: "users",
          field: "id",
        },
        onDelete: "cascade",
        onUpdate: "cascade",
      });
      await queryInterface.addConstraint("members", {
        fields: ["platform_id"],
        type: "foreign key",
        name: "fk_members_platforms",
        references: {
          table: "platforms",
          field: "id",
        },
        onDelete: "cascade",
        onUpdate: "cascade",
      });
      await queryInterface.addConstraint("platforms", {
        fields: ["room_id"],
        type: "foreign key",
        name: "fk_platforms_rooms",
        references: {
          table: "rooms",
          field: "id",
        },
        onDelete: "cascade",
        onUpdate: "cascade",
      });
      await queryInterface.addConstraint("rooms", {
        fields: ["user_id"],
        type: "foreign key",
        name: "fk_rooms_users",
        references: {
          table: "users",
          field: "id",
        },
        onDelete: "cascade",
        onUpdate: "cascade",
      });
      await tran.commit();
    }catch (err) {
      await tran.rollback();
      throw err;
    }
  },

  down: async (queryInterface, Sequelize) => {
    const tran = await queryInterface.sequelize.transaction();
    try{
      await queryInterface.removeConstraint(
        "members",
        "fk_members_users",
        {}
      );
      await queryInterface.removeConstraint(
        "members",
        "fk_members_platforms",
        {}
      );
      await queryInterface.removeConstraint(
        "platforms",
        "fk_platforms_rooms",
        {}
      );
      await queryInterface.removeConstraint(
        "rooms",
        "fk_rooms_users",
        {}
      );
      await tran.commit();
    }catch (err) {
      await tran.rollback();
      throw err;
    }
  }
};
