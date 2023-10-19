import mongoose from "mongoose";
import { Link, LinkProps } from "../../core/entities/Link";
import { LinkRepository } from "../../core/repositories/LinkRepository";
import LinkSchema from "../db/mongodb/schemas/LinkSchema";
import UserSchema from "../db/mongodb/schemas/UserSchema";

export class LinkDatabaseRepository implements LinkRepository {
  async findByUserId(userId: string): Promise<LinkProps[] | null> {
    const links = await LinkSchema.find({ user: userId });
    if (!links) {
      return null;
    }
    return links as unknown as Required<LinkProps[]>;
  }
  async create(input: Link[], userId: string): Promise<void> {
    const user = await UserSchema.findById(userId);
    const links = await LinkSchema.findOne({
      user: user?.id,
    });

    if (!links) {
      const createdLinks = await LinkSchema.create({
        links: input.map((link) => link.props),
        user,
      });
      await UserSchema.findByIdAndUpdate(userId, {
        $set: {
          links: createdLinks,
        },
      });
    }

    if (links) {
      const updatedLinks = await LinkSchema.findOneAndUpdate(
        {
          user: user?.id,
        },
        {
          $set: {
            links: input.map((link) => link.props),
          },
        }
      );

      await UserSchema.findByIdAndUpdate(userId, {
        $set: {
          links: updatedLinks,
        },
      });
    }
  }
}
