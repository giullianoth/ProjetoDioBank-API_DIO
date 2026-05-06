import type { EntityManager } from "typeorm";
import { jest } from '@jest/globals';

interface MockManagerArgs {
    saveReturn?: object | [object]
    findOneReturn?: object
}

export const getMockEntityManager = async ({
    saveReturn = undefined,
    findOneReturn = undefined
}: MockManagerArgs): Promise<EntityManager> => {
    const manager: Partial<EntityManager> = {};
    manager.save = jest.fn().mockImplementation(() => Promise.resolve(saveReturn)) as jest.Mock<any>;
    manager.findOne = jest.fn().mockImplementation(() => Promise.resolve(findOneReturn)) as jest.Mock<any>;

    return manager as EntityManager;
}