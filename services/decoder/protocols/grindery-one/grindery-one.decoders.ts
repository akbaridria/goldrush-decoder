import { GoldRushDecoder } from "../../decoder";
import { type EventType } from "../../decoder.types";
import {
    DECODED_ACTION,
    DECODED_EVENT_CATEGORY,
} from "../../decoder.constants";
import { decodeEventLog, type Abi } from "viem";
import ABI from "./abis/grindery-one.abi.json";

GoldRushDecoder.on(
    "grindery-one:Transfer",
    ["matic-mainnet"],
    ABI as Abi,
    async (log_event, tx, chain_name, covalent_client): Promise<EventType> => {
        const { raw_log_data, raw_log_topics } = log_event;

        const { args: decoded } = decodeEventLog({
            abi: ABI,
            topics: raw_log_topics as [],
            data: raw_log_data as `0x${string}`,
            eventName: "Transfer",
        }) as {
            eventName: "Transfer";
            args: {
                from: string;
                to: string;
                value: bigint;
            };
        };

        return {
            action: DECODED_ACTION.SWAPPED,
            category: DECODED_EVENT_CATEGORY.DEX,
            name: "Transfer",
            protocol: {
                logo: log_event.sender_logo_url as string,
                name: log_event.sender_name as string,
            },
            details: [
                {
                    title: "From",
                    value: decoded.from,
                    type: "address",
                },
                {
                    title: "To",
                    value: decoded.to,
                    type: "address",
                },
            ],
            tokens: [
                {
                    decimals: log_event.sender_contract_decimals,
                    heading: "Token Amount",
                    pretty_quote: "",
                    ticker_logo: log_event.sender_logo_url,
                    ticker_symbol: log_event.sender_contract_ticker_symbol,
                    value: decoded.value.toString(),
                },
            ],
        };
    }
);
