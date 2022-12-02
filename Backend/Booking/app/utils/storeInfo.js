const Store = require('../services/Stores/stores');
const Catalog = require('../services/Stores/catalog');

module.exports.storeInfo = async (storeId, serviceId) => {
    let catalog = [], catalogData, photoPath, hasCatalog = false;

    let city = (await Store.getStore(storeId)).data.data.address.city;

    let storeName = (await Store.getStore(storeId)).data.data.name;

    try { //photoPath is optional
        photoPath = (await Store.getStore(storeId)).data.data.photos.shift().url;
    }
    catch {}


    try { //catalog is optional
        catalogData = (await Catalog.getByStore(storeId)).data.data;
    }
    catch {}

    if (catalogData.length > 0) {
        if (serviceId !== undefined)
            for (let item in catalogData)
                for (let i = 0; i < serviceId.length; i++)
                    if (serviceId[i] === catalogData[item]._id)
                        catalog.push({
                            _id: serviceId[i],
                            product: catalogData[item].product,
                            price: catalogData[item].price,
                            abstract: catalogData[item].abstract
                        });
        hasCatalog = true;
    }

    return [city, storeName, photoPath, hasCatalog, catalog];
}
