import { Path, GET, DELETE, POST, PUT, QueryParam } from "typescript-rest";
import { Between, getManager, LessThan, MoreThan } from "typeorm";
import { Item } from "./../entities/Item";

@Path("/item")
export class ItemService {
  /**
   * get a list of items by contractId and between the selected dates
   * @param contractId
   * @param startDate the beginning of the payment period we want to consider. A string in format toISOString()
   * @param endDate the end of the payment period we want to consider. A string in format toISOString()
   */
  @GET
  getItemsByContractIdStartDateAndEndDate(
    @QueryParam("contractId") contractId: number,
    @QueryParam("startDate") startDate: string,
    @QueryParam("endDate") endDate: string
  ): Promise<Array<Item>> {
    return new Promise<Array<Item>>(async (resolve, reject) => {
      const repository = getManager().getRepository(Item);
    //   console.log(contractId, startDate, endDate)
      let whereClause = {};
      if (startDate && endDate) {
        whereClause = {
          where: {
            time: Between(startDate, endDate),
            contractId: contractId,
          },
        };
      } else if (startDate && !endDate) {
        whereClause = {
          where: {
            time: MoreThan(startDate),
            contractId: contractId,
          },
        };
      } else if (!startDate && endDate) {
        whereClause = {
          where: {
            time: LessThan(startDate),
            contractId: contractId,
          },
        };
      } else {
        whereClause = {
          where: {
            contractId: contractId,
          },
        };
      }
      repository.find(whereClause).then((items: Array<Item>) => {
        if (items.length === 0) reject("items with contract id " + contractId + " not found");
        return resolve(items);
      });
    });
  }

  /**
   * add one item
   * @param device
   */
  @POST
  addItem(item: Item): Promise<Item> {
    return new Promise<Item>((resolve, reject) => {
      const repository = getManager().getRepository(Item);
      item.createdAt = new Date();
      const newObj = repository.create(item);
      repository.save(newObj).then((newItem: Item) => {
        return resolve(newItem);
      });
    });
  }

  /**
   * update one item
   * @param id
   */
  @PUT
  updateItem(@QueryParam("id") id: number, item: Item): Promise<Item> {
    return new Promise<any>(async (resolve, reject) => {
      const repository = getManager().getRepository(Item);
      item.updatedAt = new Date();
      await repository.update(id, item);
      repository.findOne(id).then((updateditem) => {
        if (!updateditem) reject("item not found");
        return resolve(updateditem);
      });
    });
  }

  /**
   * delete one item. physical loss
   * @param id
   */
  @DELETE
  deleteItem(@QueryParam("id") id: number): Promise<string> {
    return new Promise<any>((resolve, reject) => {
      const repository = getManager().getRepository(Item);
      repository.findOne(id).then(async (item) => {
        if (!item) reject("item not found");
        await repository.delete(id);
        resolve("Item with id " + id + " was deleted");
      });
    });
  }
}

/**
 * 
 curl -X GET "http://localhost:3000/item?contractId=1&startDate=2021-01-06&endDate=2021-01-30"
 curl -d '{"contractId":1, "description":"Pay may", "value": 100, "isImported": true, "time":"2021-01-25","isDeleted":false}' -H "Content-Type: application/json" -X POST http://localhost:3000/item
 curl -d '{"contractId":1, "description":"Pay Jul", "value": 500, "isImported": true, "time":"2021-01-25","isDeleted":false}' -H "Content-Type: application/json" -X PUT "http://localhost:3000/item?id=1"
 curl -X DELETE "http://localhost:3000/item?id=1"
 * 
 */
