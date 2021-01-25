import { Path, GET, DELETE, POST, PUT, QueryParam } from "typescript-rest";
import { getManager } from "typeorm";
import { Item } from "./../entities/Item";

@Path("/item")
export class ItemService {
  /**
   * get a list of items by contractId and between the selected dates
   * @param contractId
   * @param startDate the beginning of the payment period we want to consider
   * @param endDate the end of the payment period we want to consider
   */
  @GET
  getItemsByContractIdStartDateAndEndDate(
    @QueryParam("contractId") contractId: number,
    @QueryParam("startDate") startDate: string,
    @QueryParam("endDate") endDate: string
  ): Promise<Array<Item>> {    
    return new Promise<Array<Item>>(async (resolve, reject) => {
        const repository = getManager().getRepository(Item)
        repository.find({ contractId: contractId }).then((items: Array<Item>) => {
            return resolve(items)
        })
    })
  }

  /**
   * add one item
   * @param device
   */
  @POST
  addItem(item: Item): Promise<Item> {
    return new Promise<Item>((resolve, reject) => {
        const repository = getManager().getRepository(Item)
        const newObj = repository.create(item)
        repository.save(newObj).then((newItem: Item) => {
            return resolve(newItem)
        })
    })
  }

  /**
   * update one item
   * @param id
   */
  @PUT
  updateItem(@QueryParam('id') id: number, item: Item): Promise<Item> {
    return new Promise<any>(async(resolve, reject) => {
        const repository = getManager().getRepository(Item)
        await repository.update(id, item)
        repository.findOne(id).then((updateditem) => {
            if (!updateditem) reject('item not found')
            return resolve(updateditem)
        })
    })
  }

  /**
   * delete one item
   * @param id
   */
  @DELETE
  deleteItem(@QueryParam('id') id: number): Promise<string> {
    return new Promise<any>((resolve, reject) => {
        const repository = getManager().getRepository(Item)
        repository.findOne(id).then(async(item) => {
            if (!item) reject ('item not found')
            await repository.delete(id)
            resolve('Item with id ' + id + ' was deleted')
        })
    })
  }
}

//curl -d '{"contractId":1, "description":"value2", "value": 100, "isImported": true, "time":"1234","createdAt":"asdas", "updatedAt":"asdas","isDeleted":"asdas"}' -H "Content-Type: application/json" -X POST http://localhost:3000/item
//curl -X DELETE "http://localhost:3000/item?id=1"
//curl -d '{"contractId":1, "description":"value11111111111111111", "value": 500, "isImported": true, "time":"1234","createdAt":"asdas", "updatedAt":"asdas","isDeleted":"asdas"}' -H "Content-Type: application/json" -X PUT "http://localhost:3000/item?id=1"
