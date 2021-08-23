import { Injectable, Logger } from '@nestjs/common';
import { GqlOptionsFactory, GqlModuleOptions } from '@nestjs/graphql';
import * as depthLimit from 'graphql-depth-limit';
import { PubSub } from 'graphql-subscriptions';
import GraphQLJSON, { GraphQLJSONObject } from 'graphql-type-json';
export class GraphqlService implements GqlOptionsFactory {
  async createGqlOptions(): Promise<GqlModuleOptions> {
    return {
      // schema,
      // executor,
      // schema: buildFederatedSchema([
      // 	{
      // 		typeDefs,
      // 		resolvers: {
      // 			JSON: GraphQLJSON,
      // 			JSONObject: GraphQLJSONObject
      // 		}
      // 	}
      // ]),
      typePaths: ['./**/*.graphql'],
      resolvers: {
        JSON: GraphQLJSON,
        JSONObject: GraphQLJSONObject,
      },
    };
  }
}
