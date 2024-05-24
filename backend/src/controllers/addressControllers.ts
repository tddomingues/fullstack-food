import { Request, Response } from "express";
import { AddressProps } from "../interface/AddressProps";
import Address from "../model/address";
import mongoose from "mongoose";

const createAddress = async (request: Request, response: Response) => {
  const { address, city, state, postalCode, userId }: AddressProps =
    request.body;

  console.log(address, city, state, postalCode, typeof userId);

  const _userId = new mongoose.Types.ObjectId(userId);

  console.log(_userId);

  try {
    const hasAnAddress = await Address.findOne({
      userId: { $eq: userId },
    });

    console.log(hasAnAddress);

    if (hasAnAddress)
      return response.status(400).json({ error: ["Possui endereço."] });

    const infoAddress = await Address.create({
      address,
      city,
      postalCode,
      state,
      userId,
    });

    return response.status(200).json(infoAddress);
  } catch (error) {
    return response.status(400).json({ error: ["Erro ao criar o endereço."] });
  }
};

const getAddress = async (request: Request, response: Response) => {
  const userId = request.userInfo?.id;

  try {
    const hasAnAddress = await Address.findOne({ userId });

    if (!hasAnAddress)
      return response.status(400).json({ error: ["Endereço não encontrado."] });

    return response.status(200).json(hasAnAddress);
  } catch (error) {
    return response
      .status(400)
      .json({ error: ["Erro ao encontrar o endereço."] });
  }
};

const updateAddress = async (request: Request, response: Response) => {
  const { address, city, state, postalCode }: AddressProps = request.body;

  const userId = request.userInfo?.id;

  try {
    const hasAnAddress = await Address.findOne({ userId }).exec();

    if (!hasAnAddress)
      return response.status(400).json({ error: ["Endereço não encontrado."] });

    if (address) hasAnAddress.address = address;
    if (city) hasAnAddress.city = city;
    if (state) hasAnAddress.state = state;
    if (postalCode) hasAnAddress.postalCode = postalCode;

    await hasAnAddress.save();

    return response.status(200).json(hasAnAddress);
  } catch (error) {
    return response
      .status(400)
      .json({ error: ["Erro ao atualizar o endereço."] });
  }
};

export const addressControllers = { createAddress, getAddress, updateAddress };
